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


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }


    load_data() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                this.setState({todos: response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.load_data()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Menu/>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/projects'/>}/>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route path='/projects'>
                            <Route index element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path=':project_title' element={<ProjectDetails projects={this.state.projects}/>}/>
                        </Route>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route path='*' element={<NoMatch/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
