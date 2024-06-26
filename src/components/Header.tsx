import { NavLink } from "react-router-dom"
import { NavBarProps } from "../interfaces/componentProps"
import '../styles/navbar-styles.css'
import logo from '../assets/persona_logo.webp'
import { useState } from "react"
import * as stylex from '@stylexjs/stylex';

export const NavBar = ({
    routes,
    height,
    backgroundColor,
    sideBarColor,
    padding,
    buttonsMarginRight,
}: NavBarProps) => {

    const [showSidebar, setShowSidebar] = useState(false)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)      
    }

    return (
        <>
            <div className="status-bar"/>
            <nav style={{
                height: height ? `${height}px` : "60px",
                backgroundColor: backgroundColor ? backgroundColor : "#fff",
                padding: padding ? padding : "20px",
                position: "fixed"
            }}
            >
                <div className="sidebar-toggle-btn" style={{marginRight: buttonsMarginRight ? `${buttonsMarginRight}px` : ''}}>
                    <p onClick={toggleSidebar}>
                        <i className={showSidebar ? 'fa-solid fa-xmark' : 'fas fa-bars'}></i>
                    </p>

                </div>
                <NavLink to="/" {...stylex.props(s.logo)}>
                    <img src={logo} alt="Logo de Persona" {...stylex.props(s.logoImg)}/>

                    <p>Center</p>
                </NavLink>

                {/* Páginas mobile */}
                
            </nav>
            <div onClick={toggleSidebar} style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)' ,
                position: 'fixed',
                width: '100%',
                height: '100vh',
                top: '0px',
                left: '0px',
                zIndex: 100,
                cursor: 'pointer',
                display: showSidebar ? 'block' : 'none'
            
            }}/>
            <div  
                className="sidebar-container"
                style={{
                    backgroundColor: sideBarColor ? sideBarColor : "#fff",
                    marginTop: '80px',
                    width: showSidebar ? '50%' : '0px',
                    height: `calc(100vh - ${height ?? 60}px)`
                }}
            >
                {
                    routes?.map((route, index) => {
                        return (
                            <NavLink 
                                to={route.url} 
                                key={index}
                                className={({ isActive }) =>
                                    isActive ? "active-link" : ""
                              }
                              onClick={toggleSidebar}
                            >{route.name}</NavLink>
                        )
                    }
                    )
                }
            </div>
        </>
    )
}

const s = stylex.create({
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        height: '80px',
        textDecoration: 'none',
        color: 'white',
        fontSize: '30px',
        fontStyle: 'italic'
    },
    logoImg: {
        height: '60px',
    }
});