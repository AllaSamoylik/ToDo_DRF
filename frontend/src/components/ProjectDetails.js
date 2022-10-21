import React from "react";
import {useParams} from "react-router-dom";

const ProjectItem = ({project, all_users}) => {
    return (
        <tr>
            <td>{project.link}</td>
            <td>
                {project.users.map((user_id) => {
                let user = all_users.find(user => user.id === user_id)
                return user.username + ' '
                })}
            </td>
            <td>{project.created}</td>
            <td>{project.updated}</td>
        </tr>
    )
}

const ProjectDetails = ({projects, users}) => {
    let {project_title} = useParams()
    let filtered_projects = projects.filter((project) => project.title.includes(project_title))
    return (
        <div>
            <h3>Project "{project_title}"</h3>
            <table style={{margin: '0 auto', width: '70%', tableLayout: 'fixed'}}>
                <thead>
                <tr>
                    <th>Link</th>
                    <th>Authors</th>
                    <th>Created</th>
                    <th>Updated</th>
                </tr>
                </thead>
                <tbody>
                {filtered_projects.map((project_, index) => <ProjectItem key={index}
                                                                         project={project_}
                                                                         all_users={users}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectDetails;