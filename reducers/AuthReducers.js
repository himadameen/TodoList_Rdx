import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from "../fetchers/Api"

const initialState = {
    token: "",
    loading: false,
    error: ""
}


export const signupUser = createAsyncThunk(
    'signupUser',
    async (body) => {
        const result = await create('/new/signup', body)
        return result
    }
)

export const loginUser = createAsyncThunk(
    'loginUser',
    async (body) => {
        const result = await create('/new/login', body)
        return result
    }
)

const authReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.token = "";
            state.name = "";
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('name')
        }
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, { payload: { error, message } }) => {
            state.loading = false
            if (error) {
                state.error = error
                alert(error)
            } else {
                alert(message)
                AsyncStorage.setItem("name", message.name);
            }
        },
        [signupUser.pending]: (state, action) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, { payload: { error, message, name } }) => {
            state.loading = false
            if (error) {
                state.error = error
                alert(error)
            } else {
                state.token = message
                AsyncStorage.setItem('token', message)
                AsyncStorage.setItem('name', name)
                var currentToken = AsyncStorage.getItem('token')
            }
        },
        [loginUser.pending]: (state, action) => {
            state.loading = true
        }
    }
})

export const { logout, addToken } = authReducer.actions
export default authReducer.reducer

