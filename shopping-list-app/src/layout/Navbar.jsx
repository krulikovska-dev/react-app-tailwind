import "./Navbar.css"
import { Fade as Hamburger } from 'hamburger-react'
import { useState } from "react"
import ThemeToggle from "../components/ThemeToggle"

function Navbar(){

    const [open, setOpen] =useState(false)
    return(
        <nav className="navbar dark:text-white">
            <h1><a  className="dark:text-white" href="/">ShoppingList</a></h1>
        
         <ul className="mainMenu">
            
            <Hamburger
            size={24}
            toggled={open}
            toggle={setOpen}
            
            />
            < ThemeToggle/>
        </ul>
        
        {open &&
        <ul className="sideMenu">
            <li><a href="/">Active Lists</a></li>
            <li><a href="/archived">Archived Lists</a></li>
           
            
            <Hamburger
            size={24}
            toggled={open}
            toggle={setOpen}
            
            />
        </ul>}
        
          
        
        </nav>
    )
    
}

export default Navbar