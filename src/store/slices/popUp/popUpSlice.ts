import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    open: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
    open: false,
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        togglePopUp: ( state, action: PayloadAction<boolean> ) => {
            state.open = action.payload;
        },
    }
});

export const { togglePopUp } = popUpSlice.actions;