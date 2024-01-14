import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import { popUpSlice } from './slices/popUp/popUpSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    popUp: popUpSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch