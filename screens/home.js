import React from 'react'
import {View, Text, Button, TouchableOpacity, ImageBackground} from 'react-native'

let encabezado = {name:'',direccion:'',condicion:'CONTADO'}

const image = require('../lib/Logo4.JPG')


function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground source={image}>        
          <TouchableOpacity onPress={() => navigation.navigate('Remisiones',{dataTable: '',encabezado:encabezado})}>
          <Text>Remisiones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('ListaRemision')}>
            <Text>Lista de remisiones</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text>Ajustes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('InventarioNube')}>
            <Text>Descargar inventario de la Nube</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Extras')}>
            <Text>Extras</Text>
          </TouchableOpacity>
      </ImageBackground>
      <Button
        title="Menus.."
        
      />
    </View>
  );
}

  export default HomeScreen