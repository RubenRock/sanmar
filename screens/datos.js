import React,{useEffect, useState} from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Button, ImageBackground} from 'react-native'
import * as SQLITE from 'expo-sqlite'
import * as Interface from '../components/interface'
import { AntDesign } from '@expo/vector-icons'

const db = SQLITE.openDatabase("db.db");

const fondo = require('../assets/fondo.png')

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
    const [dataSimilares,setDataSimilares] = useState([]) 

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
          }),

          tx.executeSql("select * from similares", [],  (tx, res) =>  {            
            let resul = [];let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }            
            setDataSimilares(resul)                                  
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
    
    const handleSurtir = (item) => {
      let simi = dataSimilares.find(ele => ele.producto == item.clave)      
      simi ? navigation.navigate('Similares',{dataTable: listProductos,cantidad:cantidad, producto:productoSeleccionado, empaque:item})
      : alert('No tiene similares')
    }
    
    return (
      <View style = {{flex:1}}>
        <ImageBackground source={fondo} style={styles.container}>
            
            <View  style={Interface.container}>
              <TouchableOpacity  onPress={ () => navigation.navigate('Remisiones', {dataTable: listProductos, encabezado: encabezado})}>
                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Agregar</Text>
              </TouchableOpacity>              
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
            </View>          

            <View style={{flex:1}}>
              <FlatList 
                style={Interface.container}
                data={productoFiltrado}            
                keyExtractor={(item) =>item.clave}
                renderItem={({item}) => <TouchableOpacity onPress={ () => handleListaProductos(item)}>                
                                            <Text style={styles.text}>{item.producto}</Text>
                                        </TouchableOpacity>}
              />
              </View>

              <View style={{flex:1,marginBottom:15}}>
              <FlatList 
                 style={Interface.container}
                data={empaqueFiltrado}
                keyExtractor={(item) =>String(item.id)}
                renderItem={({item}) =>  {
                    if (item.empaque !=='SEIS' && item.empaque !=='DOCE')
                      return(
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>                      
                          <Text style={styles.text} >{item.empaque} - {item.precio}</Text> 
                          <View style={{flexDirection:'row'}}>
                            <AntDesign name="bars" size={24} color={Interface.colorText} style={{marginRight:30}} onPress={()=> handleSurtir(item) }/>            
                            <AntDesign name="pluscircleo" size={24} color={Interface.colorText} onPress={ () => handleListaEmpaque(item)} />                      
                          </View>
                        </View>  
                      )                                   
                      
                  }
                  }
              />
              </View>
             
        </ImageBackground>
      </View>
                               
    )
  }

  export default datosScreen

const styles = StyleSheet.create({
  container:{
    flex:1,    
  },
  container2:{  
    marginTop:10,
    marginHorizontal:10,     
    backgroundColor:'rgba(4,119,224,0.2)',
    borderRadius:10,
    padding:8,    
  },
  input:{
    borderBottomWidth:2,
    borderColor:'white',
    marginTop:10,
    color:Interface.colorText
  },
  text:{
    color:"#3F3DE0",
    fontWeight:"bold"
  }

})