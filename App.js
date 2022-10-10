import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from './Store';
import Main from './Main';


function App() {
  return (
    <Provider store={Store}>
      <View style={Styles.container}>
        <Main />
      </View>
    </Provider>
  )
}

export default App


const Styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})