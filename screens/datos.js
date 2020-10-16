import React,{useState} from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native'

const productos = [
    {id:'1', producto:'azucar',precio:'20.5'},
    {id:'2', producto:'jabon',precio:'40'},
    {id:'3', producto:'leche',precio:'12.5'},

]

const empaques = [
  {id:'1', id_producto:'1',empaque:'kg',precio:'20.5'},
  {id:'2', id_producto:'1',empaque:'bulto',precio:'700'},
  {id:'3', id_producto:'2',empaque:'250g',precio:'11'},
  {id:'4', id_producto:'2',empaque:'caja',precio:'256'},
  {id:'5', id_producto:'3',empaque:'ltr',precio:'17'},
]

function datosScreen() {
    const [empaqueFiltrado,setempaqueFiltrado]= useState([])
    
    return (
      <View >
          <TextInput placeholder='Producto'/>
          <FlatList 
            style={styles.lists}
            data={productos}
            renderItem={({item}) => <TouchableOpacity
                onPress={ () => setempaqueFiltrado(empaques.filter(data => data.id_producto ==item.id ))}
              >                
                <Text >{item.id} - {item.producto}</Text>
            </TouchableOpacity>}
          />             
          <FlatList 
            style={styles.lists}
            data={empaqueFiltrado}
            renderItem={({item}) => <TouchableOpacity
                  onPress={ () => console.log(item.precio)}
                >                
                <Text >{item.id} - {item.empaque}</Text>
              </TouchableOpacity>}
          />             
      </View>
    )
  }

  export default datosScreen

const styles = StyleSheet.create({
  lists:{
    padding:5,
    marginHorizontal:5,
    marginTop:20,
    height:200,
    borderWidth:2,
    borderColor:'black',
  }
})