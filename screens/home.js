import React from 'react'
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image} from 'react-native'

let encabezado = {name:'',direccion:'',condicion:'CONTADO'}

const image = require('../assets/Logo4.png')


function HomeScreen({ navigation }) {

  return (
    <>
      <View style={styles.container}>
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
        <TouchableOpacity style={{justifyContent:'center', borderWidth:1}} onPress={() => navigation.navigate('Extras')}>
          <Text style={styles.menu}>Extras</Text>
        </TouchableOpacity>  

      </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#3F3DE0'
  },
  container1:{
      flex:1,      
      justifyContent:"center",
       
      marginHorizontal:10,     
      backgroundColor:'rgba(255,255,255,0.1)',    
      borderRadius:10,
      padding:8,      

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
      marginVertical:15, 
      marginHorizontal:10,     
      backgroundColor:'rgba(255,255,255,0.1)',    
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
    fontSize:25,
    color:'white',
    textAlign:"center",    
    marginLeft:15, 
    width:'70%',   
  },
  menu:{    
    
    marginTop:20,
    borderRadius:10,
    backgroundColor:'#3F3DE0',
    borderColor:'white',
    borderWidth:2,
    width:270,
    textAlign:"center",
    color:'white',
    fontWeight: 'bold',
    fontSize:15,   
    height:40,
    
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      
      elevation: 11,
  }
})

  export default HomeScreen