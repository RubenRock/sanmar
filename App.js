import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import pruebaScreen from './screens/prueba'
import HomeScreen from './screens/home'
import remisionesScreen from './screens/remisiones'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();
const Prueba = createStackNavigator();

const isLogged =() => {
 
  return (true)
}

function MyStack() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>      
      <Stack.Screen name="Remisiones" component={remisionesScreen} />      
    </Stack.Navigator>
  );
}

function StackPrueba() {
  return (
    <Prueba.Navigator>
      <Prueba.Screen name="prueba" component={pruebaScreen} />            
    </Prueba.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      {isLogged() ? 
        <MyStack />     
        :
        <StackPrueba /> 
      }
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
