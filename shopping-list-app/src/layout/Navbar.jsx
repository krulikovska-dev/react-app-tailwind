import "./Navbar.css"
import { Fade as Hamburger } from 'hamburger-react'
import { useState } from "react"
import ThemeToggle from "../components/ThemeToggle"
import { useLanguage } from "../context/useLanguage"
import { t } from "../translations"

function Navbar() {
    const [open, setOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const tr = t[language];

    return (
        <nav className="navbar dark:text-white">
            <h1><a className="dark:text-white" href="/">ShoppingList</a></h1>

            <ul className="mainMenu">
                <Hamburger size={24} toggled={open} toggle={setOpen} />
                <ThemeToggle />
                <button
                    onClick={toggleLanguage}
                    className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                >
                    {language === "en" ? "🇨🇿 CZ" : "🇬🇧 EN"}
                </button>
            </ul>

            {open && (
                <ul className="sideMenu">
                    <li><a href="/">{tr.activeLists}</a></li>
                    <li><a href="/archived">{tr.archivedLists}</a></li>
                    <Hamburger size={24} toggled={open} toggle={setOpen} />
                </ul>
            )}
        </nav>
    );
}

export default Navbar;