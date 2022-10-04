import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.title}`}>{project.title}</Link>
            </td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table style={{margin: '0 auto', width: '50%', tableLayout: 'fixed'}}>
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