import React from 'react'
import {Link} from "react-router-dom";

const TodoItem = ({todo, delete_todo}) => {
    return (
        <tr>
            <td>{todo.project.title}</td>
            <td>{todo.text}</td>
            <td>{todo.user.username}</td>
            <td>{todo.is_active === true ? 'active' : 'not active'}</td>
            <td>
                <button onClick={() => delete_todo(todo.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}
const TodoList = ({todos, delete_todo}) => {
    return (
        <div>
            <table style={{margin: '0 auto', width: '50%', tableLayout: 'fixed'}}>
                <thead>
                <tr>
                    <th>Project</th>
                    <th>Text</th>
                    <th>User</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo_, index) => <TodoItem key={index}
                                                       todo={todo_}
                                                       delete_todo={delete_todo}
                />)}
                </tbody>
            </table><br></br>
            <Link to='/todos/create'>Create</Link>
        </div>

    )
}
export default TodoList;
