import React, { useContext } from 'react'
import { themeContext } from '../Context/ThemeContext'

export const useTheme = () => {
    return useContext(themeContext)
}
