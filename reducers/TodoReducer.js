import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { create, getList, deleteList } from '../fetchers/Api';

const initialState = {
    todo: []
}

export const createTodo = createAsyncThunk(
    'createTodo',
    async (body) => {
        const result = await create('/todo_list/create', body)
        return result
    }
)

export const fetchTodo = createAsyncThunk(
    'fetchTodo',
    async () => {
        const result = await getList('/todo_list')
        return result
    }
)

export const deleteTodo = createAsyncThunk(
    'deleteTodo',
    async (id, { dispatch }) => {
        const result = await deleteList(`/todo_list/remove/${id}`)
        dispatch(fetchTodo())
        return result
    }
)

const todoReducer = createSlice({
    name: "todo",
    initialState,
    reducers: {
        out: (state, action) => {
            state.todo = initialState;
        }
    },
    extraReducers: {
        [createTodo.fulfilled]: (state, { payload: { message } }) => {
            if (message) state.todo.push(message)
        },

        [fetchTodo.fulfilled]: (state, { payload }) => {
            state.todo = [...payload.message]
        },

        [deleteTodo.fulfilled]: (state, { payload: { message } }) => { },
    }
})

export const { out } = todoReducer.actions
export default todoReducer.reducer
