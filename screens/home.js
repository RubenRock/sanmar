import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image} from 'react-native'

let encabezado = {name:'',direccion:'',condicion:'CONTADO'}

const image = require('../lib/Logo4.JPG')


function HomeScreen({ navigation }) {

  return (
    <>
      <View style={styles.container1}>
        <Image source={image} style={styles.stretch}/>        
                       
      </View>

      <View style={styles.container2}>

      </View>

      <View style={styles.container3}>
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

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor:'#f3a683'
  },
  container2:{
    flex:0.5
  },
  container3:{
    flex:1.5,
    backgroundColor:'#778beb'
  },
  stretch: {
    width: 110,
    height: 100,
    
    
    
  }
})

  export default HomeScreen