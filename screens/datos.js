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
    const [cantidad,setCantidad] = useState('1')    
    const [productoSeleccionado, setproductoSeleccionado] = useState('')    
    const [listProductos, setlistProductos] = useState([])  //guarda los datos para la tabla que muestro en remisiones
    const [txtProducto, settxtProducto] = useState([])  //necesario para limpiar la caja de producto
    
    
    
    //necesitan los hooks por eso tienen que estar dentro de esta funcion
    const changeCantidad = (cant) => {
      setCantidad(cant)
    }

    const handleTxtProducto = (texto) => {
      setproductoFiltrado(productoFilter(texto))
      settxtProducto(texto)
    }

    const handleListaProductos = (item)=>{  
      setempaqueFiltrado(empaques.filter(data => data.id_producto ==item.id )) //filtra la lista de empaques     
      setproductoSeleccionado(item.producto) //almaceno el producto seleccionado
    }

    console.log(cantidad)
    console.log(listProductos)

    const handleListaEmpaque = (item) =>{
      
      setlistProductos([{
        producto:productoSeleccionado,
        empaque:item.empaque,
        precio:item.precio, 
        cantidad:cantidad},
        ...listProductos]
      )

      

      //limpiar ventana
      /* setproductoFiltrado('')
      setCantidad('1')
      setproductoFiltrado(productos)
      setempaqueFiltrado([])
      settxtProducto('')
       */
    }
    
    
    return (
      <View >
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
            onBlur={() => changeCantidad(cantidad)}
            //console.log(cantidad)}
            value={cantidad} 
            
          />
          <Text> input : {cantidad}</Text>
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
                </View>
                }
          />
           <Button title="mostrar" onPress={ () => console.log(txtProducto)} />               
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