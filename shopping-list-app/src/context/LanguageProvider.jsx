import { useState } from "react";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");

    const toggleLanguage = () => {
        setLanguage(prev => prev === "en" ? "cs" : "en");
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}