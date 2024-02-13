import { TodoCardProps } from "../../../interfaces/componentProps"
import * as stylex from '@stylexjs/stylex';

export const TodoCard = ({todo, onClick, onDoneCheckbox, style1}: TodoCardProps) => {

    const {title, description, priority, done} = todo;

    

    return (
        // @ts-expect-error
        <div {...stylex.props(s.todoCard, style1 ? s[priority + '1'] : s[priority])} onDoubleClick={onClick}>
            <div>
                <h3>{title}</h3>
                <p {...stylex.props(s.desc)}>{description}</p>
            </div>
            <div>
                <input {...stylex.props(s.checkbox)} type="checkbox" checked={done} onChange={() => onDoneCheckbox(title)}/>
                <i style={s.icon}  className='fa-solid fa-pen-to-square'onClick={onClick}/>
            </div>
        </div>
        
    )
}


const s = stylex.create({
    todoCard: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid rgba(255,255,255,0.1)',
        justifyContent: 'space-between',
        alignItems: 'center',
        // maxWidth: 1200,
        width: '100%',
        padding: '10px 20px',
        borderRadius: 10,
        transition: 'all 0.3s ease',
        ':hover': {
            background: 'rgba(255,255,255,0.1)',
        },
        userSelect: 'none',

        animation: 'fadeLeft .3s'
    },
    desc: {
        // color: 'grey',
    },
    checkbox: {
        marginRight: 10,
        width: 20,
        height: 20
    },
    icon: {
        cursor: 'pointer',
        fontSize: '20px',
        color: 'red'
    },
    'red': {
        // border: '1px solid #EF476F'
        background: '#EF476F'
    },
    'blue': {
        // border: '1px solid #118AB2'
        background: '#118AB2'
    },
    'green': {

        // border: '1px solid #06D6A0'
        background: '#06D6A0',
        color: 'black'
    },
    'red1': {
        border: '1px solid #EF476F',
        background: 'transparent'
    },
    'blue1': {
        border: '1px solid #118AB2',
        background: 'transparent'
    },
    'green1': {
        border: '1px solid #06D6A0',
        background: 'transparent',
        color: 'white'
    }
})