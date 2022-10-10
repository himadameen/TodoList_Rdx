import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from "../fetchers/Api"

const initialState = {
    token : "",
    loading : false,
    error : ""
}


export const signupUser = createAsyncThunk(
    'signupUser',
    async (body)=>{
        const result = await create('/new/signup', body)
        // console.log("result", result)
        return result
    }
)

export const loginUser  = createAsyncThunk(
    'loginUser',
    async (body) => {
        const result = await create('/new/login', body)
        return result
    }
)

// export const addToken  = createAsyncThunk(
//     'addToken',
//     async () => {
//         const result = await AsyncStorage.getItem('token');
//         return result
//     }
// )

const authReducer = createSlice({
    name : 'user',
    initialState,
    reducers:{
        addToken: async (state,action) => {
            state.token = await AsyncStorage.getItem('token')
            console.log("getting Token", state.token)
            action.payload = state.token
        },
        logout: (state,action) => {
            // state.token = null,
            // state.name = null,
            // action.payload = undefined
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('name')
        }
    },
    extraReducers:{
        [signupUser.fulfilled]:async(state,{payload:{error,message}}) => {
            state.loading = false
            if(error){
                state.error = error
                alert(error)
                console.log(error)
            }else{
                state.error = message
                alert(message)
                await AsyncStorage.setItem("name", message.name);
                console.log(message)
            }
        },
        // [signupUser.pending]:(state, action)=>{
        //     state.loading = true
        // },
        // [addToken.fulfilled]:(state,action)=>{
        //     state.token = action.payload
        // },
        [loginUser.fulfilled]:async (state,{payload:{error,message, name}})=>{
            state.loading = false
            if(error){
                state.error = error
                alert(error)
                console.log(error)
            }else{
                state.token = message
                // console.log("message", message, name)
               await AsyncStorage.setItem('token', message)
               await AsyncStorage.setItem('name', name)
               var currentToken = AsyncStorage.getItem('token')
               console.log("currentToken", currentToken);
                // console.log(message)
            }
        },
        // [loginUser.pending]:(state, action)=>{
        //     state.loading = true
        // }
    }
})

export  const {logout, addToken} = authReducer.actions
export default authReducer.reducer









