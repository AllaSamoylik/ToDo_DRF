import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, all_users, delete_project}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.title}`}>{project.title}</Link>
            </td>
            <td>{project.link}</td>
            <td>
                {project.users.map((user_id) => {
                let user = all_users.find(user => user.id === user_id)
                return user.username + ' '
                })}
            </td>
            <td>
                <button onClick={() => delete_project(project.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, users, delete_project}) => {
    return (
        <div>
            <table style={{margin: '0 auto', width: '70%', tableLayout: 'fixed'}}>
            <thead>
            <tr>
                <th>Project name</th>
                <th>Link</th>
                <th>Authors</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project_, index) => <ProjectItem key={index} project={project_}
                                                            delete_project={delete_project}
                                                            all_users={users}/>)}
            </tbody>
        </table><br></br>
        <Link to='/projects/update'>Update</Link><br></br>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList;