import React from "react";
import {useParams} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectDetails = ({projects}) => {
    let {project_title} = useParams()
    let filtered_projects = projects.filter((project) => project.title.includes(project_title))
    return (
        <div>
            <h3>Project "{project_title}"</h3>
            <table style={{margin: '0 auto', width: '50%', tableLayout: 'fixed'}}>
                <thead>
                <tr>
                    <th>Link</th>
                    <th>Users</th>
                </tr>
                </thead>
                <tbody>
                {filtered_projects.map((project_, index) => <ProjectItem key={index} project={project_}/>)}
                </tbody>
            </table>
        </div>
)
}

export default ProjectDetails;