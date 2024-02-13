import { useState } from "react";
import { Todo } from "../../../interfaces/componentProps";

export const todoInitialState: Todo = {
    title: '',
    description: '',
    done: false,
    priority: 'none',
} 

export const useNewTodoForm = ( initialForm: Todo = todoInitialState) => {

    const [formState, setFormState] = useState(initialForm)

    const resetState = () => {
      setFormState(initialForm)
    }

    const onInputChange = ({target}: any) => {
      const {name, value} = target;
      setFormState({
        ...formState,
        [name]: value
      });
    }

    const setTodoForm = (client: Todo) => {
      setFormState(client)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        setTodoForm,
        resetState

    }
}