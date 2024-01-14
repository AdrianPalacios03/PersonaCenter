import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
interface AuthState {
    user: User | null;
}

// Define the initial state using that type
const initialState: AuthState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: ( state, action: PayloadAction<User | null> ) => {
            state.user = action.payload;
        },
    }
});

export const { logIn } = authSlice.actions;