import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/AuthReducers'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState({});
    const [form, setForm] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { error, token } = useSelector((state) => state.user);

    const submit = () => {
        if (error) {
            setErr(validate(email, password));
            setForm(true);
        } else {
            dispatch(loginUser({ email, password }))
        }
    }

    useEffect(() => {
        if (token) {
            navigation.navigate('Home')
            setEmail(""), setPassword("")
        }
    }, [token])

    const switches = () => {
        navigation.navigate('Signup');
    }

    const validate = (email, password) => {
        const er = {}
        const errs = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!email) {
            er.email = "Please fill the email"
        } else if (!errs.test(email)) {
            er.email = "Please enter valid email"
        } else;
        if (!password) {
            er.password = "Please fill the password"
        } else;

        return er;
    }

    return (
        <View style={styles.main}>
            <View style={styles.head}>
                <Text style={styles.txt}><Text style={{ color: "plum" }}>Login</Text> Form</Text>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false} name="email"
                    placeholder={"Enter your email"} placeholderTextColor={'#99A799'} value={email} onChangeText={(e) => setEmail(e)} />
                <Text style={styles.err}>{err.email}</Text>
                <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false} name="password"
                    placeholder={"Enter your password"} placeholderTextColor={'#99A799'} value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} />
                <Text style={styles.err}>{err.password}</Text>
                <TouchableOpacity style={styles.btn_s}
                    onPress={switches}>
                    <Text style={styles.txt_2}>Don't have an account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => submit()}>
                    <Text style={styles.txt_3}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({

    main: {
        width: "100%"
    },
    head: {
        marginVertical: 20,
    },
    txt: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 700,
        fontStyle: 'oblique',
        textTransform: 'capitalize',
        letterSpacing: 4
    },
    form: {
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
    txt_2: {
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
    txt_3: {
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
