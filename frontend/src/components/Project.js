import React from "react";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.title}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table style={{margin: '0 auto'}}>
            <thead>
            <tr>
                <th>Project name</th>
                <th>Link</th>
                <th>Users</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project_, index) => <ProjectItem key={index} project={project_}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList;