import {NavLink} from "react-router-dom";

import "./NavigationBar.css";

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({isActive}) => isActive ? "active-link" : "default-link"}
                        to="/newpost">
                        Nieuwe Post
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;