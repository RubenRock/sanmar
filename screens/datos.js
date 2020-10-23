import React,{useEffect, useState} from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Button, ScrollView} from 'react-native'

const productos = [
    {id:'1', producto:'azucar',precio:'20.5'},
    {id:'2', producto:'jabon',precio:'40'},
    {id:'3', producto:'leche',precio:'12.5'},

]

const empaques = [
  {id:'1', id_producto:'1',empaque:'kg',precio:'20.5',seis:'112'},
  {id:'2', id_producto:'1',empaque:'bulto',precio:'700'},
  {id:'3', id_producto:'2',empaque:'250g',precio:'11'},
  {id:'4', id_producto:'2',empaque:'caja',precio:'256'},
  {id:'5', id_producto:'3',empaque:'ltr',precio:'17', doce:'200'},
]

const productoFilter = (text) =>  productos.filter((x)=>String(x.producto).includes(text))

function datosScreen({navigation, route}) {
    const {dataTable} = route.params
    const [empaqueFiltrado,setempaqueFiltrado]= useState([]) 
    const [productoFiltrado,setproductoFiltrado] = useState(productos)
    const [cantidad,setCantidad] = useState('1')    
    const [productoSeleccionado, setproductoSeleccionado] = useState('')    
    const [listProductos, setlistProductos] = useState([])  //guarda los datos para la tabla que muestro en remisiones
    const [txtProducto, settxtProducto] = useState(' ')  //necesario para limpiar la caja de producto
    
    useEffect(() =>{
      setlistProductos(dataTable)
    },[route])
    
    //necesitan los hooks por eso tienen que estar dentro de esta funcion
    const changeCantidad = (cant) => {      
        setCantidad(cant)
        setempaqueFiltrado([]) //necesito actualizar el estado de la variable actualizar cada vez que la modifico     
    }

    const handleTxtProducto = (texto) => {
      setproductoFiltrado(productoFilter(texto))
      settxtProducto(texto)
    }

    const handleListaProductos = (item)=>{  
      setempaqueFiltrado(empaques.filter(data => data.id_producto ==item.id )) //filtra la lista de empaques     
      setproductoSeleccionado(item.producto) //almaceno el producto seleccionado
    }

    const handlePrice = (item) => {      
      if (cantidad == '6')  {if (item.seis)  return parseFloat(item.seis/6).toFixed(2)}

      if (cantidad % 12 == 0)  {if (item.doce)  return parseFloat(item.doce/12).toFixed(2)}

      return item.precio
    }

    const handleTotal = (item) =>{
      if (cantidad == '6')  {if (item.seis)  return item.seis}

      if (cantidad % 12 == 0)  {if (item.doce)  return (cantidad/12)*item.doce}

      return item.precio*cantidad
    }

    const handleListaEmpaque = (item) =>{

      handlePrice(item)
      
      setlistProductos([
        ...listProductos,{
        id: String(Math.random()),
        producto:productoSeleccionado,
        empaque:item.empaque,
        precio:handlePrice(item), 
        cantidad:cantidad,
        total: handleTotal(item)}
      ])     

      //limpiar ventana
      setproductoFiltrado('')
      setCantidad('1')
      setproductoFiltrado(productos)
      setempaqueFiltrado([])
      settxtProducto('')

      
      
    }
    
    
    return (
      <View >
        <ScrollView>
          <Button title="Agregar" onPress={ () => navigation.navigate('Remisiones', {dataTable: listProductos})} />    
          <TextInput 
            placeholder='Producto' 
            onChangeText={(texto) => handleTxtProducto(texto) }
            style={styles.input}
            value={txtProducto}
            
          />
          <TextInput 
            style={styles.input}
            placeholder='Cantidad'                        
            onChangeText={(x) => changeCantidad(x)}                        
            value={cantidad} 
            
          />          
          <FlatList 
            style={styles.lists}
            data={productoFiltrado}
            renderItem={({item}) => <TouchableOpacity
                onPress={ () => handleListaProductos(item)}
              >                
                <Text >{item.id} - {item.producto}</Text>
            </TouchableOpacity>}
          />             
          <FlatList 
            style={styles.lists}
            data={empaqueFiltrado}
            renderItem={({item}) => 
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>                
                  <Text  >{item.empaque} - {item.precio}</Text>             
                  <Button title="Agregar" onPress={ () => handleListaEmpaque(item)} />                             
                  {/* <Button title="Agregar" onPress={ () =>  setlistProductos([{cantidad:cantidad}])} /> */}
                </View>
                }
          />
        </ScrollView>    
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