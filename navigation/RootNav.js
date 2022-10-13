import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthRoute from './AuthRoute'
import Home from '../screens/Home';

const RootNav = () => {

    const token = useSelector(state => state.user.token);
    const Stack = createNativeStackNavigator();
    const [currentToken, setCurrentToken] = useState("");

    const getToken = async () => {
        const dis = await AsyncStorage.getItem('token')
        setCurrentToken(dis)
        return dis;
    }

    useEffect(() => {
        getToken();
    }, [])

    return (
        <View>
            <NavigationContainer>
                {currentToken ?
                    (
                        <Home />
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="AuthRoute" component={AuthRoute} options={{
                                headerTitleStyle: {
                                    fontSize: 22,
                                    fontStyle: "normal",
                                    textTransform: "uppercase",
                                    letterSpacing: 8
                                },
                                headerTitleAlign: 'center',
                                headerTitle: "Register"
                            }} />
                        </Stack.Navigator>
                    )
                }
            </NavigationContainer>
        </View>
    )
}

export default RootNav

