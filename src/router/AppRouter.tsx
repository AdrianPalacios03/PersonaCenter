
import { Routes, Route  } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { Login } from "../pages/login/Login"
import { useAppSelector } from "../hooks/reduxHooks";
import { Menu } from "../pages/menu/Menu";
import { Todos } from "../pages/todos/Todos";

export const AppRouter = () => {
    const user = useAppSelector((state) => state.auth.user);
    
    return (
        <Routes>
            {
                user 
                ? 
                    <>
                        <Route path="/" element={<Menu />} /> 
                        <Route path="/clients" element={<Home />} /> 
                        <Route path="/todos" element={<Todos />} /> 
                    </>
                :
                    <>
                        <Route path="/" element={<Login />} /> 
                        <Route path="/*" element={<Login />} /> 
                    </>
            }

        </Routes>
    )
}