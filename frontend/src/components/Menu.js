import React from "react";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <nav style={{padding: '10px', background: 'aliceblue'}}>
            <ul style={{listStyleType: 'none', padding: '0'}}>
                <li>
                    <Link to='/users'>Users</Link>
                </li>
                <li>
                    <Link to='/projects'>Projects</Link>
                </li>
                <li>
                    <Link to='/todos'>Todos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu