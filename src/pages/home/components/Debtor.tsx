import * as stylex from "@stylexjs/stylex";
import { DebtorProps } from "../../../interfaces/componentProps"

export const Debtor = ({debtor, onclick}: DebtorProps) => {
    return (
        <li {...stylex.props(s.debtor)} onClick={() => onclick(debtor)}>{debtor} <span {...stylex.props(s.icon)}><i  className='fa-solid fa-trash' /></span></li>
    )
}

const s = stylex.create({
    debtor: {
        padding: '.5rem 1rem',
        borderRadius: '100px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        backgroundColor: 'rgba(255,255,255,0.05)',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,0.1)'
        }
    },
    icon: {
        marginLeft: '1rem',
        color: '#f57676'
    }
    
});