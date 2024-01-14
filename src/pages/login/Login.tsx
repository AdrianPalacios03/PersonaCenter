import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from 'react';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { sToast } from "../../util/toast";
import { logIn } from "../../store/slices/auth/authSlice";
import authUser from "../../database/authUser";

export const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (email && password) {
            handleLogin(email, password);
        }
    }, [])
  
    const handleEmailChange = (e: any) => {
        setEmailValue(e.target.value);
    };
  
    const handlePasswordChange = (e: any) => {
        setPasswordValue(e.target.value);
    };
  
    const handleLogin = async (email?: string, password?: string) => {
        const authEmail = email ? email : emailValue;
        const authPassword = password ? password : passwordValue;
        const user = await authUser(authEmail, authPassword);

        if (user) {
            dispatch(logIn(user));
            if (email && password) return;
            localStorage.setItem('email', emailValue);
            localStorage.setItem('password', passwordValue);
        } else {
            sToast('Wrong email or password', true);
        }
    };
  
    return (
      <div {...stylex.props(styles.container)}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={emailValue}
          onChange={handleEmailChange}
          {...stylex.props(styles.input)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwordValue}
          onChange={handlePasswordChange}
          {...stylex.props(styles.input)}
        />
        <button {...stylex.props(styles.button)} onClick={() => handleLogin()}>
          Iniciar sesión
        </button>
      </div>
    );
}

const styles = stylex.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
      },
      input: {
        marginBottom: '10px',
        padding: '8px',
        fontSize: '16px',
      },
      button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      },
});