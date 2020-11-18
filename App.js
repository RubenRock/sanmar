import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import pruebaScreen from './screens/prueba'
import HomeScreen from './screens/home'
import remisionesScreen from './screens/remisiones'
import datosScreen from './screens/datos'
import extrasScreen from './screens/extras'
import listaRemisionScreen from './screens/listaremision'
import DescargarInventario from './screens/descargarinventario'
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
      <Stack.Screen name="Home" component={HomeScreen}  options={{         
          headerStyle: {
            backgroundColor: '#3F3DE0',           
          },
          headerTintColor: 'white'}}/>      
      <Stack.Screen name="Remisiones" component={remisionesScreen} />      
      <Stack.Screen name="Datos" component={datosScreen} />      
      <Stack.Screen name="Prueba" component={datosScreen} />      
      <Stack.Screen name="InventarioNube" component={DescargarInventario} />  
      <Stack.Screen name="ListaRemision" component={listaRemisionScreen} />  
      <Stack.Screen name="Extras" component={extrasScreen} />  
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
