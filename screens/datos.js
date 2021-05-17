import React,{useEffect, useState} from 'react'
import {View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView} from 'react-native'
import * as Interface from '../components/interface'
import { AntDesign } from '@expo/vector-icons'
import {useSelector} from 'react-redux'

const fondo = require('../assets/fondo.png')

function datosScreen({navigation, route}) {
    const {dataTable, encabezado} = route.params   //encabezado trae nombre, domicilio y condicion para que no se borre de remisiones 
    
    //obtenemos los daatos de Redux
    const inventarioRedux = useSelector(state => state.inventario)
    const empaqueRedux = useSelector(state => state.empaque)
    const similarRedux = useSelector(state => state.similar)

    
    const [empaqueFiltrado,setempaqueFiltrado]= useState([]) 
    const [productoFiltrado,setproductoFiltrado] = useState([])
    const [cantidad,setCantidad] = useState('1')    
    const [productoSeleccionado, setproductoSeleccionado] = useState('')    
    const [listProductos, setlistProductos] = useState([])  //guarda los datos para la tabla que muestro en remisiones
    const [txtProducto, settxtProducto] = useState('')  //necesario para limpiar la caja de producto
    const [dataInventario,setDataInventario] = useState([]) 
    const [dataEmpaque,setDataEmpaque] = useState() 
    const [dataSimilares,setDataSimilares] = useState([]) 

    

    const productoFilter = (text) => {
      let resul = []      
      let textMayus=''      
      textMayus = text
      resul = dataInventario.filter((x)=> String(x.producto).includes(textMayus.toUpperCase()))
      return(resul.filter((x,index)=> index <= 20))
    }
    
    //leemos los datos de la bd local
   
    useEffect( () => {     
      setDataInventario(inventarioRedux)  
      setDataEmpaque(empaqueRedux) 
      setDataSimilares(similarRedux)       
    },[])

    //filtramos la lista de producto a n items en la vista
    const inventarioFiltrado = () => dataInventario.filter((x,index) => index<=20)    
    
    useEffect(() =>{                     
      setproductoFiltrado(inventarioFiltrado())      
    },[dataInventario])    
    
    useEffect(() =>{
      setlistProductos(dataTable)
      
      setCantidad('1')
      setproductoFiltrado(inventarioFiltrado())
      setempaqueFiltrado([])
      settxtProducto('')
    },[route]) 
    
    //necesitan los hooks por eso tienen que estar dentro de esta funcion
    const changeCantidad = (cant) => {      
        setCantidad(cant)
        setempaqueFiltrado([]) //necesito actualizar el estado de la variable cada vez que la modifico     
    }

    const handleTxtProducto = (texto) => {      
      setproductoFiltrado(productoFilter(texto))
      settxtProducto(texto)
      setempaqueFiltrado('') //limpiamos lista de empaques
    }  

   
   
    const handleListaProductos = (item)=>{                  
      setproductoSeleccionado(item) //almaceno el producto seleccionado      
      setempaqueFiltrado(dataEmpaque.filter(data => data.clave ==item.clave )) //filtra la lista de empaques                 
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
        producto:productoSeleccionado.producto,
        empaque:item.empaque,
        precio:handlePrice(item), 
        cantidad:cantidad,
        total: handleTotal(item),
        clave: item.clave,  //los necesito para el boton de aumentar y disminuir de remisiones
        piezas:item.piezas,
        clave_empaque: item.id}
      ]) 

      //limpiar ventana
      setCantidad('1')
      setproductoFiltrado(inventarioFiltrado())
      setempaqueFiltrado([])
      settxtProducto('')
      setproductoSeleccionado('')
      console.log(listProductos)
    }
    
    const handleSurtir = (item) => {      
     let simi = dataSimilares.find(ele => ele.producto == item.clave)     
     navigation.navigate('Similares',{dataTable: listProductos,cantidad:cantidad, claveSimilar:simi.clave, empaque:item})     
    }

    const messageSplash = () => {
      return(
         <Text style={{fontSize:10,color:Interface.colorText,textAlign:'right',marginRight:10}}>{productoSeleccionado.producto}</Text>                
      )      
    }
    
    return (
      <View style = {{flex:1}}>
        <ImageBackground source={fondo} style={styles.container}>
            <ScrollView>
            <View  style={Interface.container}>
              <TouchableOpacity  onPress={ () => navigation.navigate('Remisiones', {dataTable: listProductos, encabezado: encabezado})}>
                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Agregar</Text>
              </TouchableOpacity>  
              <View style={{flexDirection:'row', alignItems:"center"}}>
                <AntDesign name="search1" size={18} color={Interface.colorText} />
                <TextInput                    
                  onChangeText={(texto) => handleTxtProducto(texto) }
                  style={[styles.input,{width:'90%'}]}
                  value={txtProducto}
                 
                />        
              </View>            

              <TextInput 
                style={styles.input}
                placeholder='Cantidad'                        
                onChangeText={(x) => changeCantidad(x)}                        
                value={cantidad} 
                
              />
            </View>              
                
            {messageSplash()}         

            <View style={{height:250}}>
              <FlatList 
                style={Interface.container}
                data={productoFiltrado}            
                keyExtractor={(item) =>item.clave}
                renderItem={({item}) => <TouchableOpacity style={{marginBottom:10}} onPress={ () => handleListaProductos(item)}>                                                                
                                            <Text style={styles.text}>{item.producto}</Text>
                                        </TouchableOpacity>}
              />           
                          
            </View>                              
              
              <View style={{marginBottom:15}}>
              <FlatList 
                 style={Interface.container}
                data={empaqueFiltrado}
                keyExtractor={(item) =>String(item.id)}
                renderItem={({item}) =>  {
                    if (item.empaque !=='SEIS' && item.empaque !=='DOCE')
                      return(
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>                      
                        <TouchableOpacity>                        
                          <Text style={styles.text} >{item.empaque} - {item.precio}</Text> 
                          </TouchableOpacity>
                          <View style={{flexDirection:'row'}}>
                            {dataSimilares.find(ele => ele.producto == item.clave) ?  //filtro el boton de surtir solo para los que si pueden hacerlo
                              <AntDesign name="bars" size={24} color={Interface.colorText} style={{marginRight:30}} onPress={()=> handleSurtir(item) }/>            
                              : null
                            }
                            <AntDesign name="pluscircleo" size={24} color={Interface.colorText} onPress={ () => handleListaEmpaque(item)} />                      
                          </View>
                        </View>  
                      )                                   
                      
                  }
                  }
              />
              </View>              
              </ScrollView>
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
    color:Interface.colorText,
    
  },
  text:{
    color:Interface.colorText,
    fontWeight:"bold"
  },
  textstrike:{
    color:Interface.colorText,
    fontWeight:"bold",
    backgroundColor: 'rgba(0,0,0,0.1) ',
    borderRadius:50,
    paddingLeft:5,
  },

})