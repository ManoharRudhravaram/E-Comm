import React, { createContext, useEffect, useState } from 'react'

export const themeContext = createContext();
export default function ThemeContext({ children }) {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? "dark" : 'light';
    function changeTheme() {
        setIsDark(pre => !pre);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme",theme)
    }, [isDark])
    
    return (
        <themeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </themeContext.Provider>
    )
}
