import React from 'react';
import Home from '../screens/Home'
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Nav = () => {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <SafeAreaProvider >
                <SafeAreaView>
                    <Stack.Navigator initialRouteName={'Login'}>
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
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

export default Nav