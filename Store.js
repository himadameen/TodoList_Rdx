import AuthReducers from './reducers/AuthReducers';
import TodoReducer from './reducers/TodoReducer';
import { configureStore } from '@reduxjs/toolkit';


export const Store = configureStore({
  reducer: {
    user: AuthReducers,
    todo: TodoReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
