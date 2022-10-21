import './App.css';
import React from "react";
import axios from "axios";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {BrowserRouter, Routes, Navigate, Route} from 'react-router-dom';
import NoMatch from "./components/NoMatch";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import ProjectDetails from "./components/ProjectDetails";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'authorized_user': ''
        }
    }

    create_project(title, link, users) {
        const headers = this.get_headers()
        const data = {title: title, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
    }

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
    }


    create_todo(project, text, user) {
        const headers = this.get_headers()
        const data = {project: project, text: text, user: user}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }


    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }


    set_token(token, authorized_user) {
        const cookies = new Cookies()
        cookies.set('token', token)
        localStorage.setItem('authorized_user', authorized_user)

        this.setState({'authorized_user': localStorage.getItem('authorized_user')})
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
        localStorage.setItem('authorized_user', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'], username)
            })
            .catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                this.setState({todos: response.data})
            })
            .catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.setState({'authorized_user': localStorage.getItem('authorized_user')})
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Menu/>
                    <div style={{paddingBottom: '30px', background: 'aliceblue'}}>
                        {this.is_authenticated() ?
                            <div>Hello, {this.state.authorized_user}</div> :
                            <div>Hello, Guest</div>}
                    </div>
                    <div style={{paddingBottom: '30px', background: 'aliceblue'}}>
                        {this.is_authenticated() ?
                            <button
                                onClick={() => this.logout()}>Logout
                            </button> :
                            <button
                                onClick={() => {
                                    window.location.href = '/login'
                                }}>Login
                            </button>
                        }
                    </div>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/projects'/>}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>

                        <Route path='/projects'>
                            <Route index element={
                                <ProjectList projects={this.state.projects}
                                             users={this.state.users}
                                             delete_project={(id) => this.delete_project(id)}
                                />}
                            />
                            <Route path='/projects/create' element={
                                <ProjectForm users={this.state.users}
                                             create_project={(title, link, users) => this.create_project(title, link, users)}
                                />}
                            />
                            <Route path=':project_title' element={
                                <ProjectDetails projects={this.state.projects}
                                                users={this.state.users}
                                />}
                            />
                        </Route>

                        <Route exact path='/todos' element={
                            <TodoList todos={this.state.todos}
                                      delete_todo={(id) => this.delete_todo(id)}
                            />}

                        />
                        <Route exact path='/todos/create' element={
                            <TodoForm create_todo={(project, text, user) => this.create_todo(project, text, user)}/>}
                        />

                        <Route path='*' element={<NoMatch/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
