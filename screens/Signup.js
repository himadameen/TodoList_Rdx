import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-web'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../reducers/AuthReducers'

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_password] = useState('');

    const [err, SetErr] = useState({});
    const [form, setForm] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);

    const Authenticate = () => {
        if (error) {
            SetErr(validate(name, email, password, re_password));
            setForm(true);
        } else {
            dispatch(signupUser({ name, email, password, re_password }))
            setTimeout(function () {
                navigation.navigate('Login')
                setEmail(""), setPassword("")
            }, 2000);
        }
    }

    const switches = () => {
        navigation.navigate('Login');
    }

    const validate = (data) => {
        const er = {}
        const errs = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!data.name) {
            er.name = "Please fill the name"
        }
        if (!data.email) {
            er.email = "Please fill the email"
        } else if (!errs.test(data.email)) {
            er.email = "Please enter valid email"
        } else;
        if (!data.password) {
            er.password = "Please fill the password"
        }
        if (!data.re_password) {
            er.re_password = "Please fill the confirm password"
        }
        return er;
    }


    return (
        <>
            <View style={styles.body}>
                <View style={styles.head}>
                    <Text style={styles.title}>Signup <Text style={{ color: "plum" }}>Form</Text></Text>
                </View>
                <View style={styles.boxes}>
                    <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false} name='name'
                        placeholder={"Enter your name"} placeholderTextColor={'#99A799'} value={name} onChangeText={(e) => setName(e)} />
                    <Text style={styles.err}>{err.name}</Text>
                    <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false} name='email'
                        placeholder={"Enter your email"} placeholderTextColor={'#99A799'} value={email} onChangeText={(e) => setEmail(e)} />
                    <Text style={styles.err}>{err.email}</Text>
                    <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false} name='password'
                        placeholder={"Enter your password"} placeholderTextColor={'#99A799'} value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} />
                    <Text style={styles.err}>{err.password}</Text>
                    <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false} name='re_password'
                        placeholder={"Confirm your password"} placeholderTextColor={'#99A799'} value={re_password} onChangeText={(e) => setRe_password(e)} secureTextEntry={true} />
                    <Text style={styles.err}>{err.re_password}</Text>
                    <TouchableOpacity style={styles.btn_s}
                        onPress={switches}>
                        <Text style={styles.txt}>Already have an account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => Authenticate()}>
                        <Text style={styles.txt_2}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Signup

const styles = StyleSheet.create({

    body: {
        flex: 1,
        width: "100%"
    },
    head: {
        marginVertical: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 700,
        fontStyle: 'oblique',
        textTransform: 'capitalize',
        letterSpacing: 4
    },
    boxes: {
        marginVertical: 20,
    },
    inp: {
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        margin: 25,
        // outline: "none",
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 600
    },
    btn_s: {
        marginVertical: 15,
        textAlign: "center"
    },
    txt: {
        fontSize: 20,
        fontWeight: 700,
        fontStyle: 'oblique',
        textTransform: "lowercase"
    },
    btn: {
        margin: 20,
        textAlign: 'center',
        backgroundColor: "blue",
        paddingVertical: 10,
        borderRadius: 10,
    },
    txt_2: {
        fontSize: 20,
        fontWeight: 700,
        fontStyle: "oblique",
        letterSpacing: 10,
        color: "lavender",
        textTransform: "capitalize"
    },
    err: {
        color: "red",
        marginHorizontal: 25,
        fontSize: 14,
        fontStyle: "normal",
        textTransform: "lowercase"
    }

})
