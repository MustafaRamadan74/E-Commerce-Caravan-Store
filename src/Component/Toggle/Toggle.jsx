import { useContext } from 'react';
import React from 'react'
import "./Toggle.css"
import { ThemeContextVar } from '../../Context/DarkModeContext'

export default function Toggle() {

    const theme = useContext(ThemeContextVar)

    function handleClick() {
        theme.dispatch({ type: "TOGGLE" })
    }

    return <>


        <div className="t">
            <i className="fa-solid fa-sun"></i>
            <i className="fa-solid fa-moon"></i>
            <div className="button" onClick={handleClick} style={{ left: theme.state.darkMode ? -1 : 26 }}></div>
        </div>



    </>
}
