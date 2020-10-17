import React,{useState} from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Button} from 'react-native'

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

const productoFilter = (text) =>  productos.filter((x)=>String(x.producto).includes(text))
  


function datosScreen() {
    const [empaqueFiltrado,setempaqueFiltrado]= useState([])
    const [productoFiltrado,setproductoFiltrado] = useState(productos)
    
    
    return (
      <View >
          <TextInput 
            placeholder='Producto' 
            onChangeText={(t) => setproductoFiltrado(productoFilter(t))}
            style={styles.input}
          />
          <FlatList 
            style={styles.lists}
            data={productoFiltrado}
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
                  //onPress={ () => console.log(item.precio)}
                  style={{flexDirection:'row'}}
                >                
                <Text >{item.empaque} - {item.precio}</Text>
                <Button title="pushame" onPress={ () => console.log(item.precio)}></Button>
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
    
  },
  input:{
    padding:5,
    margin:5,
  }
})