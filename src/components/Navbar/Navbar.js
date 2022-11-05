import React from 'react';
import {  Link } from "react-router-dom";

const Navbar= () =>{
    return (
        <div>
            <li>
                <Link to="/LookupWord">Lookup Word</Link>
            </li>
            <li>
                <Link to="Flashcards">Flashcards</Link>
            </li>
        </div>
    );
}

export default Navbar;