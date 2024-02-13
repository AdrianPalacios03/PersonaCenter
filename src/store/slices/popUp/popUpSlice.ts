import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    open: boolean;
    todoOpen: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
    open: false,
    todoOpen: false
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        togglePopUp: ( state, action: PayloadAction<boolean> ) => {
            state.open = action.payload;
        },
        toggleTodoPopUp: ( state, action: PayloadAction<boolean> ) => {
            state.todoOpen = action.payload;
        }
    }
});

export const { togglePopUp, toggleTodoPopUp } = popUpSlice.actions;