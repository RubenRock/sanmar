import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image} from 'react-native'

let encabezado = {name:'',direccion:'',condicion:'CONTADO'}

const image = require('../lib/Logo4.JPG')


function HomeScreen({ navigation }) {

  return (
    <>
      
      <View style={styles.container1}>
        <View style = {{flexDirection:'row',alignItems:'center'}}>
          <View style={styles.shadowimage}>
            <Image source={image} style={styles.image} />                          
          </View>
          <Text style={styles.text}>¡¡Bievenido a San Martin App!!</Text>
        </View>
      </View>      

      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Remisiones',{dataTable: '',encabezado:encabezado})}>
          <Text style={styles.menu}>Remisiones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('ListaRemision')}>
          <Text style={styles.menu}>Lista de remisiones</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.menu}>Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InventarioNube')}>
          <Text style={styles.menu}>Descargar inventario de la Nube</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Extras')}>
          <Text style={styles.menu}>Extras</Text>
        </TouchableOpacity>  

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container1:{
      flex:1,      
      justifyContent:"center",
      marginVertical:20, 
      marginHorizontal:10,     
      backgroundColor:'red',    
      borderRadius:10,
      padding:8,
      alignSelf:'stretch',

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      
      elevation: 11,
  },
  container2:{
      flex:2,
      alignItems:"center",
      marginVertical:20, 
      marginHorizontal:10,     
      backgroundColor:'#0084ff',    
      borderRadius:10,
      padding:8,
      alignSelf:'stretch',

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      
      elevation: 11,
  },
  shadowimage:{
    borderRadius:50,
    width: 100,
    height: 100,  

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    
    elevation: 15,
  },
  image: {
    borderRadius:50,
    width: 100,
    height: 100,     
  },
  text:{
    fontWeight: 'bold',
    fontSize:40,
    color:'white',
    textAlign:'center',
    marginLeft:15,    
  },
  menu:{
    marginTop:15,
    borderRadius:10,
    backgroundColor:'white',
    width:250,
    textAlign:"center",
    color:'red',
    fontWeight: 'bold',
    fontSize:15,    
  }
})

  export default HomeScreen