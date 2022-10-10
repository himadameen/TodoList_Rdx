import AsyncStorage from '@react-native-async-storage/async-storage';

// const url = "http://localhost:4002"
const url = "https://todo-rdx.vercel.app"

export const create = async (api, body) => {
    const res = await fetch(url + api, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": await AsyncStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json();
}

export const getList = async (api, body) => {
    const chk = await AsyncStorage.getItem('token');
    console.log("chk", chk)
    const res = await fetch(url + api, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": await AsyncStorage.getItem('token')
        }
    })
    // const chkk = await res.json()
    // console.log("chkk", chkk)

    return await res.json();
}

export const deleteList = async (api, body) => {
    const res = await fetch(url + api, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "Authorization": await AsyncStorage.getItem('token')
        }
    })
    return await res.json();
}