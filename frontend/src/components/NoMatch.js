import {Link, useLocation} from 'react-router-dom'
import React from "react";

const NoMatch = () => {
    let {pathname} = useLocation()
    return (
        <div>
            <h1 style={{color: "red", fontSize: 100}}>404</h1>
            <h3>Page '{pathname}' not found!</h3>
            <p>
                <Link to='/'>Go Home</Link>
            </p>
        </div>
    )
}
export default NoMatch;
