import * as stylex from '@stylexjs/stylex';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { Todo } from '../../interfaces/componentProps';
import { todoInitialState, useNewTodoForm } from './hooks/useNewTodoForm';
import { getTodos } from '../../database/getTodos';
import { saveTodosList } from '../../database/saveTodosList';
import { toggleTodoPopUp } from '../../store/slices/popUp/popUpSlice';
import PopUp from '../home/components/PopUp';
import { PlusButton } from '../home/components/PlusButton';
import { TodoCard } from './components/TodoCard';

export const Todos = () => {

    const user = useAppSelector((state) => state.auth.user);
    const popUpOpen = useAppSelector((state) => state.popUp.todoOpen);
    const dispatch = useAppDispatch();
    const [todosList, setTodosList] = useState<Todo[]>([]);
    const [styleValue, setStyleValue] = useState(false)
    const { formState, onInputChange, setTodoForm } = useNewTodoForm();
    const [edittingTodo, setEdittingTodo] = useState({
            editting: false,
            todo: todoInitialState
        }
    );

    const fetchTodos = async () => {
        await getTodos(user).then(async (todos) => {
            setTodosList(todos);
        })
    }

    const changeStyle = () => {
        setStyleValue(!styleValue)
        localStorage.setItem('styleValue', JSON.stringify(!styleValue))
    }

    useEffect(() => {
        fetchTodos();
        const style = JSON.parse(localStorage.getItem('styleValue') || 'false')
        setStyleValue(style)
    }, []);

    const saveTodos = () => {
        saveTodosList(user, {todos: todosList});
    }

    const handleInputChange = (e: any) => {
        onInputChange(e);
    }

    const handleSaveTodo = () => {
        const editting = edittingTodo.editting;

        if (editting) {
            const newTodosList = todosList.map((todo) => {
                if (todo.title === edittingTodo.todo.title) {
                    return formState;
                }
                return todo;
            });

            setTodosList(newTodosList);
        } else {
            setTodosList([...todosList, formState]);
        }

        dispatch(toggleTodoPopUp(false));
        onPopUpClose();
    }

    const handleTodoClick = (todo: Todo) => {
        setTodoForm(todo);
        setEdittingTodo({
            editting: true,
            todo
        });
        dispatch(toggleTodoPopUp(true));
    }

    const onPopUpClose = () => {
        dispatch(toggleTodoPopUp(false));
        setTodoForm(todoInitialState);
        setEdittingTodo({
            editting: false,
            todo: todoInitialState
        });
    }

    const deleteTodo = () => {
        const newTodosList = todosList.filter((todo) => todo.title !== edittingTodo.todo.title);
        setTodosList(newTodosList);
        dispatch(toggleTodoPopUp(false));
        setTodoForm(todoInitialState);
        setEdittingTodo({
            editting: false,
            todo: todoInitialState
        });
    }

    const handleDoneCheckbox = (title: string) => {
        const newTodosList = todosList.map((t) => {
            if (t.title === title) {
                return {
                    ...t,
                    done: !t.done
                }
            }
            return t;
        });
        setTodosList(newTodosList);
    }
    

    return (
        <div {...stylex.props(s.container)}>

            <h1 onClick={changeStyle}>To do's</h1>

            <div {...stylex.props(s.todosContainer)}>
                {
                    todosList.length === 0
                    ? <h3>Que vacío...</h3>
                    :
                        todosList.map((todo) => {
                            return (
                                <TodoCard 
                                    todo={todo}
                                    onClick={() => handleTodoClick(todo)} 
                                    onDoneCheckbox={handleDoneCheckbox}
                                    style1={styleValue}
                                    key={todo.title}
                                />
                            )
                        })
                }
            </div>
            <PopUp
                visible={popUpOpen}
                onClose={onPopUpClose} 
                {...stylex.props(s.popUp)}    
            >
                <h2>
                    {
                        edittingTodo.editting
                        ?
                        `Edit ${edittingTodo.todo.title}`
                        :
                        'New todo'
                    }
                </h2>
                <input type='text' name='title' placeholder='Title' value={formState.title} onChange={handleInputChange}/>
                <input type='text' name='description' placeholder='Description' value={formState.description} onChange={handleInputChange}/>
                <select {...stylex.props(s.select)} name='priority' value={formState.priority} onChange={handleInputChange}>
                    <option value='none'>None</option>
                    <option value='green'>Green</option>
                    <option value='blue'>Blue</option>
                    <option value='red'>Red</option>
                </select>

                
                <div {...stylex.props(s.popUpsBtns)}>
                    <button onClick={() => handleSaveTodo()} className='btn'><i className='fa-solid fa-floppy-disk'/> Save</button>
                    {
                        edittingTodo.editting
                        &&
                        // delete button
                        <button className='btn' onClick={deleteTodo}><i className='fa-solid fa-trash'/> Delete</button>
                    }
                </div>
            </PopUp>

            <PlusButton onClick={saveTodos} todosBtn/>
        </div>
    )
}

const s = stylex.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '120px 1rem',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    todosContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        alignItems: 'center'

    },
    profit: {
        color: 'white',
        animation: 'fadeLeft .3s'
    },
    profitNum: {
        color: 'grey'
    },
    month: {
        color: 'grey',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginLeft: '1rem'
    },
    popUp: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        gap: '1rem',
    },
    select: {
        width: '100%'
    },
    popUpsBtns: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        alignItems: 'flex-start',
        listStyle: 'none',
        marginTop: '20px'
    }

});