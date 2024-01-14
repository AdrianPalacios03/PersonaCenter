
import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { Login } from "../pages/login/Login"
import { useAppSelector } from "../hooks/reduxHooks";

export const AppRouter = () => {
    const user = useAppSelector((state) => state.auth.user);
    
    return (
        <Routes>
            {
                user ? 
                <Route path="/" element={<Home />} /> :
                <Route path="/" element={<Login />} /> 
            }

        </Routes>
    )
}