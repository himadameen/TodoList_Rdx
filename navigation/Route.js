import { View } from 'react-native'
import React, { useEffect } from 'react';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import { addToken } from '../reducers/AuthReducers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Nav = () => {

    const Stack = createNativeStackNavigator();
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    console.log(token);


    const getToken = () => {
        const dis = dispatch(addToken());
        console.log("disToken", dis);
        if(!dis){
            console.log("error")
            return none
        }else{
            // return dis
        }
    }


    // useEffect(() => {
    //     const getToken = dispatch(addToken());
    //     console.log("getToken", getToken)
    // }, [])
    // const getToken = () => {
    //     const dis =  dispatch(addToken());
    //     console.log("getToken", dis);
    //     if(dis){
    //         console.log("success", dis)
                    
    //         // return dis
    //     }else {
    //         console.log("none", none)
    //         return dis
    //     }
    //     // return dis;
    // }

    // const check = () => {
    //     if(getToken)
    // }

    // useEffect(() => {
    //     getToken(dispatch(addToken()));
    // }, []);

    return (
        <>
            {/* <View> */}
                <SafeAreaProvider >
                    <SafeAreaView>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName={getToken() ? 'Home' : 'Login'}>
                                {/* <Stack.Navigator initialRouteName={'Login'}> */}
                                <Stack.Screen name="Signup" component={Signup} options={{
                                    headerTitleStyle: {
                                        fontSize: 22,
                                        fontStyle: "normal",
                                        textTransform: "uppercase",
                                        letterSpacing: 8
                                    },
                                    headerTitleAlign: 'center',
                                    headerTitle: "Register"
                                }} />
                                <Stack.Screen name="Login" component={Login} options={{
                                    headerTitleStyle: {
                                        fontSize: 22,
                                        fontStyle: "normal",
                                        textTransform: "uppercase",
                                        letterSpacing: 8
                                    },
                                    headerTitleAlign: 'center',
                                    headerTitle: "SigIn"

                                }} />
                                <Stack.Screen name="Home" component={Home} options={{
                                    headerTitleStyle: {
                                        fontSize: 20,
                                        fontStyle: "normal",
                                        textTransform: "uppercase",
                                        letterSpacing: 5
                                    },
                                    headerTitleAlign: 'left',
                                    headerTitle: "Your tasks"

                                }} />

                            </Stack.Navigator>
                        </NavigationContainer>
                    </SafeAreaView>
                </SafeAreaProvider>
            {/* </View> */}
        </>
    )
}

export default Nav