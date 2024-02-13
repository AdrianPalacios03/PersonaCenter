import * as stylex from '@stylexjs/stylex';
import { NavLink, useNavigate } from "react-router-dom"
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';

export const Menu = () => {

    const user = useAppSelector ((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (!user?.email?.includes('anpa')) {
            navigate('/todos')
        }
    }, []);

    return (
        <div {...stylex.props(s.container)}>
            <div {...stylex.props(s.menu)}>
                <NavLink {...stylex.props(s.link)} to="/clients">
                    <h2>Clients</h2>
                    <p>Check your clients, debtors and profits.</p>
                </NavLink>
                <NavLink {...stylex.props(s.link, s.link2)} to="/todos">
                    <h2>To do's</h2>
                    <p>Check your To do's.</p>
                </NavLink>
                <NavLink {...stylex.props(s.link, s.link3)} to="/clients">
                    <h2>Progress</h2>
                    <p>It's been a long way...</p>
                </NavLink>
                <NavLink {...stylex.props(s.link, s.link4)} to="/clients">
                    <h3>Coming soon</h3>
                    <p>This is the home of your new ideas.</p>
                </NavLink>
            </div>
        </div>
    )
}


const s = stylex.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '1rem',
        paddingBottom: '60px',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100vh',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    menu: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridColumnGap: '10px',
        gridRowGap: '10px',
        padding: '1rem',
    },
    link: {
        color: '#06D6A0',
        border: '1px solid #06D6A0',
        padding: '1rem',
        textDecoration: 'none',
        transition: 'all .3s',
        ':hover': {
            color: 'white',
            backgroundColor: '#06D6A0',
            border: '1px solid #06D6A0',
        }
    },
    link2: {
        color: '#FFD166',
        border: '1px solid #FFD166',
        ':hover': {
            color: 'white',
            backgroundColor: '#FFD166',
            border: '1px solid #FFD166',
        }
    },
    link3: {
        color: '#118AB2',
        border: '1px solid #118AB2',
        ':hover': {
            color: 'white',
            backgroundColor: '#118AB2',
            border: '1px solid #118AB2',
        }
    },
    link4: {
        color: '#EF476F',
        border: '1px solid #EF476F',
        ':hover': {
            color: 'white',
            backgroundColor: '#EF476F',
            border: '1px solid #EF476F',
        }
    }
});