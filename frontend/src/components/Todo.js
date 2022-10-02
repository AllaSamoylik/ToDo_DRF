import React from 'react'

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.user}</td>
            <td>{todo.is_active}</td>
        </tr>
    )
}
const TodoList = ({todos}) => {
    return (
        <table style={{margin: '0 auto'}}>
            <thead>
            <tr>
                <th>Project</th>
                <th>Text</th>
                <th>User</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
                {todos.map((todo_, index) => <TodoItem key={index} todo={todo_}/>)}
            </tbody>
        </table>
    )
}
export default TodoList;
