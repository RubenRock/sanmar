import React from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native'

const productos = [
    {id:'1', producto:'azucar',precio:'20.5'},
    {id:'2', producto:'jabon',precio:'40'},
    {id:'3', producto:'leche',precio:'12.5'},

]


function datosScreen() {
    console.log(productos)
    return (
      <View >
          <TextInput placeholder='Producto'/>
          <FlatList 
            data={productos}
            renderItem={({item}) => <TouchableOpacity><Text >{item.id} - {item.producto}</Text></TouchableOpacity>}
          />

          
         
      </View>
    )
  }

  export default datosScreen