import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-web';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/AuthReducers';
import { createTodo, deleteTodo, fetchTodo } from '../reducers/TodoReducer'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  const [myTodo, setMyTodo] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch()
  const { todo } = useSelector(state => state.todo)
  // console.log("todo", todo);
  const navigation = useNavigation();

  const handleOut = () => {
    dispatch(logout())
    navigation.navigate('Login')
  }


  const getName = async () => {
    const name = await AsyncStorage.getItem("name")
    // console.log(" name val ", name)
    setName(name)
  }

  useEffect(() => {
    dispatch(fetchTodo())
    getName()
  }, [])

  const ItemList = ({ title, id }) => {
    return (
      <>
        <View style={styles.list_box}>
          <Text style={styles.list}>{title}</Text>
          <Feather name='delete' size={30} color="plum" onPress={() => dispatch(deleteTodo(id))
          } />
        </View>
      </>
    )
  }

  return (
    <>
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.txt}>Welcome <Text style={{ color: "plum" }}>{name}</Text></Text>
        </View>
        <Text style={styles.txt_2}>Hurray!!! Come on ✌✌</Text>
        <Text style={{ borderBottomWidth: 1, color: "grey", width: "90%", marginVertical: 15, marginHorizontal: 15 }}></Text>
        <View style={styles.list_inp}>
          <TextInput style={styles.inp} autoCapitalize='none' autoCorrect={false}
            placeholder={"Write todo"} placeholderTextColor={'#99A799'} values={myTodo} onChangeText={(e) => setMyTodo(e)} />
          <Button title={"Add todo"}
            onPress={() => dispatch(createTodo({ todo: myTodo }))} />
          {/* <ItemList /> */}
          <FlatList data={todo}
            renderItem={({ item }) => <ItemList title={item.todo} id={item._id} />}
            keyExtractor={item => item._id} />
          <TouchableOpacity style={styles.btn_2} onPress={handleOut} >
            <Text style={styles.lg_ot}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({

  body: {
    width: "100%",
  },
  title: {
    margin: 20
  },
  txt: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    fontStyle: "oblique",
    textTransform: "uppercase",
    letterSpacing: 6
  },
  txt_2: {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 5,
    textAlign: "center",
    marginVertical: 5
  },
  inp: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    margin: 25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 600
  },
  list_box: {
    marginVertical: 30,
    marginHorizontal: 25,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    borderBottomWidth: 4,
    borderBottomColor: "#D8D8D8",
  },
  list: {
    fontSize: 20,
    fontWeight: 700,
    fontStyle: "oblique",
    textTransform: "uppercase",
    paddingHorizontal: 15
  },
  btn_2: {
    marginHorizontal: "30%",
    marginTop: 15,
    backgroundColor: "plum",
    borderRadius: 15,
  },
  lg_ot: {
    color: "white",
    textAlign: 'center',
    padding: 12,
    fontSize: 20,
    fontWeight: 700,
    fontStyle: "oblique",
    letterSpacing: 5
  }
})