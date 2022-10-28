import graphene
from graphene_django import DjangoObjectType

from todoapp.models import ToDo, Project
from users.models import CustomUser


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(CustomUserType)
    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))
    projects_by_users_username = graphene.List(ProjectType, username=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_projects_by_users_username(self, info, username=None):
        projects = Project.objects.all()
        if username:
            projects = projects.filter(users__username=username)
        return projects

# -------------------------------------
# Все заметки + ссылка на проект
# {
#   allTodos {
#     id
#     text
#     project {
#       link
#     }
#   }
# }
# -------------------------------------
# Все авторы + все его заметки
# {
# 	allUsers {
#     username
#     todoSet {
#       text
#     }
#   }
# }
# -------------------------------------
# Конкретный автор (по id)
# {
# 	userById(id:3) {
#     id
#     username
#     email
#   }
# }
# -------------------------------------
# Все проекты конкретного автора (по имени)
# {
# 	projectsByUsersUsername(username: "Matthew") {
#     title
#   }
# }
# -------------------------------------


class CustomUserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(CustomUserType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        user = CustomUser.objects.create(**kwargs)
        return cls(user=user)


class CustomUserUpdateMutation(graphene.Mutation):
    class Arguments:
        last_name = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(CustomUserType)

    @classmethod
    def mutate(cls, root, info, id, last_name):
        user = CustomUser.objects.get(id=id)
        user.last_name = last_name
        user.save()
        return cls(user=user)


class CustomUserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    users = graphene.List(CustomUserType)

    @classmethod
    def mutate(cls, root, info, id):
        CustomUser.objects.get(id=id).delete()
        return cls(users=CustomUser.objects.all())


class ToDoCreateMutation(graphene.Mutation):
    class Arguments:
        project = graphene.Int(required=True)
        text = graphene.String(required=True)
        user = graphene.Int(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, project, text, user):
        project_obj = Project.objects.get(id=project)
        user_obj = CustomUser.objects.get(id=user)
        _todo = ToDo.objects.create(project=project_obj, text=text, user=user_obj)
        return cls(todo=_todo)


class Mutation(graphene.ObjectType):
    create_user = CustomUserCreateMutation.Field()
    update_user = CustomUserUpdateMutation.Field()
    delete_user = CustomUserDeleteMutation.Field()
    create_todo = ToDoCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

# -------------------------------------
# Создание автора
# mutation {
#   createUser(email: "test2@test.ru", username: "test_user", password: "Yhdgki78fr") {
#     user {
#       id
#       username
#     }
#   }
# }
# -------------------------------------
# Изменение фамилии автора
# mutation {
#   updateUser(id: 2, lastName: "Davis") {
#     user {
#       id
#       lastName
#     }
#   }
# }
# -------------------------------------
# Удаление автора
# mutation {
#   deleteUser(id: 20) {
#     users {
#       id
#       username
#     }
#   }
# }
# -------------------------------------
# Создание заметки
# mutation {
#   createTodo(project: 3, text: "some", user: 4) {
#     todo {
#       text
#       user {
#         username
#       }
#       project {
#         title
#       }
#     }
#   }
# }
# -------------------------------------
