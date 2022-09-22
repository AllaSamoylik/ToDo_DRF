import './App.css';
import React from "react";
import UserList from "./components/User";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        // const users = [
        //     {
        //         'username': 'Фёдор',
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'email': 1821
        //     },
        //     {
        //         'username': 'Фёдор',
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'email': 1880
        //     },
        // ]
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            const users = response.data
            this.setState({
                'users': users
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

export default App;
