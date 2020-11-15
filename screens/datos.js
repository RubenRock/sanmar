import React,{useEffect, useState} from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Button, ScrollView, RefreshControlComponent} from 'react-native'
import * as SQLITE from 'expo-sqlite'


const db = SQLITE.openDatabase("db.db");

/* 
const productos = [
    {id:'1', producto:'azucar',precio:'20.5'},
    {id:'2', producto:'jabon',precio:'40'},
    {id:'3', producto:'leche',precio:'12.5'},

] */
 


const empaques = [
  {id:'1', id_producto:"21/10/202005:51:54 p.m.",empaque:'kg',precio:'20.5',seis:'112'},
  {id:'2', id_producto:"21/10/202005:51:54 p.m.",empaque:'bulto',precio:'700'},
  {id:'3', id_producto:'2',empaque:'250g',precio:'11'},
  {id:'4', id_producto:'2',empaque:'caja',precio:'256'},
  {id:'5', id_producto:'3',empaque:'ltr',precio:'17', doce:'200'},
]



function datosScreen({navigation, route}) {
    const {dataTable, encabezado} = route.params   //encabezado trae nombre, domicilio y condicion para que no se borre de remisiones 

    
    const [empaqueFiltrado,setempaqueFiltrado]= useState([]) 
    const [productoFiltrado,setproductoFiltrado] = useState(dataInventario)
    const [cantidad,setCantidad] = useState('1')    
    const [productoSeleccionado, setproductoSeleccionado] = useState('')    
    const [listProductos, setlistProductos] = useState([])  //guarda los datos para la tabla que muestro en remisiones
    const [txtProducto, settxtProducto] = useState('')  //necesario para limpiar la caja de producto
    const [dataInventario,setDataInventario] = useState() 
    const [dataEmpaque,setDataEmpaque] = useState() 

    const productoFilter = (text) =>  dataInventario.filter((x)=>String(x.producto).includes(text))

    //leemos los datos de la bd local
    useEffect( () => {
      db.transaction(
        tx => {               
          tx.executeSql("select * from inventario", [],  (tx, res) =>  {            
            let resul = [];let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }            
            setDataInventario(resul)                                  
          }),

          tx.executeSql("select * from empaques", [],  (tx, res) =>  {            
            let resul = [];let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }            
            setDataEmpaque(resul)                                  
          })

        },
        (e) => console.log(e.message))
    },[])

    
    
    
    
     useEffect(() =>{
      setproductoFiltrado(dataInventario)
    },[dataInventario])
    
    
    useEffect(() =>{
      setlistProductos(dataTable)
    },[route]) 
    
    //necesitan los hooks por eso tienen que estar dentro de esta funcion
    const changeCantidad = (cant) => {      
        setCantidad(cant)
        setempaqueFiltrado([]) //necesito actualizar el estado de la variable cada vez que la modifico     
    }

    const handleTxtProducto = (texto) => {
      setproductoFiltrado(productoFilter(texto))
      settxtProducto(texto)
    }

    const handleListaProductos = (item)=>{  
      setempaqueFiltrado(dataEmpaque.filter(data => data.clave ==item.clave )) //filtra la lista de empaques     
      setproductoSeleccionado(item.producto) //almaceno el producto seleccionado
    }

    const handlePrice = (item) => {      
      let arrayseis= empaqueFiltrado, arraydoce = empaqueFiltrado
      
      let seis = arrayseis.filter((ele) => ele.empaque == 'SEIS' && item.piezas == ele.piezas)      

      let doce = arraydoce.filter((ele) => ele.empaque == 'DOCE' && item.piezas == ele.piezas)      

      if (cantidad == '6')  {if (seis.length)  return parseFloat(seis[0].precio/6).toFixed(2)}

      if (cantidad % 12 == 0)  {if (doce.length)  return parseFloat(doce[0].precio/12).toFixed(2)}

      return item.precio
    }

    const handleTotal = (item) =>{
      let arrayseis= empaqueFiltrado, arraydoce = empaqueFiltrado
      
      let seis = arrayseis.filter((ele) => ele.empaque == 'SEIS' && item.piezas == ele.piezas)      

      let doce = arraydoce.filter((ele) => ele.empaque == 'DOCE' && item.piezas == ele.piezas)      

      if (cantidad == '6')  {if (seis.length)  return seis[0].precio}

      if (cantidad % 12 == 0)  {if (doce.length)  return (cantidad/12)*doce[0].precio}

      return item.precio*cantidad
    }

    const handleListaEmpaque = (item) =>{      
      
      setlistProductos([
        ...listProductos,{
        id: String(Math.random()),
        producto:productoSeleccionado,
        empaque:item.empaque,
        precio:handlePrice(item), 
        cantidad:cantidad,
        total: handleTotal(item),
        clave: item.clave,  //los necesito para el boton de aumentar y disminuir de remisiones
        piezas:item.piezas}
      ])     

      //limpiar ventana
      setproductoFiltrado('')
      setCantidad('1')
      setproductoFiltrado(dataInventario)
      setempaqueFiltrado([])
      settxtProducto('')

      
      
    }
    
    
    return (
      <View >
      
          <Button title="Agregar" onPress={ () => navigation.navigate('Remisiones', {dataTable: listProductos, encabezado: encabezado})} />    
          <TextInput 
            placeholder='Producto' 
            onChangeText={(texto) => handleTxtProducto(texto.toUpperCase()) }
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
            keyExtractor={(item) =>item.clave}
            renderItem={({item}) => <TouchableOpacity
                onPress={ () => handleListaProductos(item)}
              >                
                <Text >{item.producto}</Text>
            </TouchableOpacity>}
          />             
          <FlatList 
            style={styles.lists}
            data={empaqueFiltrado}
            keyExtractor={(item) =>String(item.id)}
            renderItem={({item}) =>                 
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>                
                      
                    <Text  >{item.empaque} - {item.precio}</Text>             
                    <Button title="Agregar" onPress={ () => handleListaEmpaque(item)} />                             
                                    
                  </View>               
                }
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