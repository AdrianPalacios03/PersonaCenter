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
import { sToast } from '../../util/toast';

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
    const [showDList, setShowDList] = useState(false);

    const fetchTodos = async () => {
        await getTodos(user).then(async (todos: Todo[]) => {
            // Buscar todo que tenga el titulo "1200 de la semana", si existe y hoy es miércoles, cambiar su done a false
            const today = new Date();
            const day = today.getDay();
            const weekDay = day === 0 ? 6 : day - 1;
            const weekDayTodos = todos.filter((todo: Todo) => todo.title.includes('1200 de la semana') && todo.done);
            const weekDayTodo = weekDayTodos.find((todo: Todo) => todo.title.includes(weekDay.toString()));
            if (weekDayTodo) {
                weekDayTodo.done = false;
                setTodosList(todos);
                saveTodosList(user, {todos: todos}, false );
            } else {
                setTodosList(todos);
            }
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

    useEffect(() => {
        if (todosList.length === 0) return;
        saveTodosList(user, {todos: todosList}, false);
    }, [todosList])

    const saveTodos = () => {
        saveTodosList(user, {todos: todosList});
    }

    const handleInputChange = (e: any) => {
        onInputChange(e);
    }

    const handleSaveTodo = () => {
        if (!formState.title) return sToast('Title is required', true);
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

    const sortPriority = (a: Todo, b: Todo) => {
        const prioridades = { red: 1, blue: 2, green: 3, none: 4};
        const prioridadA = prioridades[a.priority] || 9999;
        const prioridadB = prioridades[b.priority] || 9999;
    
        return prioridadA - prioridadB;
    }
    

    return (
        <div {...stylex.props(s.container)}>

            <div {...stylex.props(s.title)}>
                <h1 onClick={changeStyle}>To do's</h1>
                <i className='fa-solid fa-rotate-right' onClick={fetchTodos}/>
            </div>

            <div {...stylex.props(s.todosContainer)}>
                {
                    todosList.filter((todo) => !todo.done).length === 0
                    ? <h3>Que vacío...</h3>
                    :
                        todosList.filter((todo) => !todo.done).sort(sortPriority) .map((todo) => {
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

            <h2 {...stylex.props(s.dListTitle)} onClick={() => setShowDList(!showDList)}
            >Done <i className={`fa-solid fa-chevron-down ${showDList && 'turned-chevron'} `}/></h2>
            <div {...stylex.props(showDList ? s.dList : s.dNone)}>
                {
                    todosList.filter((todo) => todo.done).map((todo) => {
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
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        animation: 'fadeLeft .3s'
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
    },
    dListTitle: {
        transition: 'all .3s',
        alignSelf: 'flex-start',
        padding: '5px 10px',
        borderRadius: '5px',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, .05)',
        }
    },
    dNone: {
        display: 'none !important'
    },

});