import * as stylex from '@stylexjs/stylex';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { togglePopUp, toggleTodoPopUp } from '../../../store/slices/popUp/popUpSlice';
import { PlusButtonProps } from '../../../interfaces/componentProps';

export const PlusButton = ({onClick, todosBtn = false}: PlusButtonProps) => {

    const dispatch = useAppDispatch();
    const popUpOpen = useAppSelector((state) => state.popUp.open);

    const handlePlusClick = () => {
        if (todosBtn) {
            dispatch(toggleTodoPopUp(true));
        } else {
            dispatch(togglePopUp(!popUpOpen));
        }
    }

    return (
        <>
            <div {...stylex.props(s.div)} onClick={handlePlusClick}>
                <i className='fa-solid fa-plus'/>
            </div>

            <div {...stylex.props(s.div, s.saveBtn)} onClick={onClick}>
                <i className='fa-solid fa-floppy-disk'/>
            </div>


        </>
    )
}

const s = stylex.create({
    div: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(255,255,255,0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        color: 'white',
        fontSize: '1.8rem',
        background: 'linear-gradient(45deg, black, #1c1c1c)',
        ':hover': {
            transform: 'scale(1.1)'
        }
    },
    saveBtn: {
        bottom: '7rem',
    }
});