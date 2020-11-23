import React, { useState, useEffect } from 'react'
import {View, ImageBackground,Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import * as Interface from '../components/interface'
import * as SQLITE from 'expo-sqlite'
import { AntDesign } from '@expo/vector-icons'

const db = SQLITE.openDatabase("db.db");

function similaresScreen({navigation, route}){
    const {cantidad, producto, empaque} = route.params  

    const [dataInventario, setDataInventario] = useState([])
    const [totalPiezas, setDatatotalPiezas] = useState('0')
    const [productoSeleccionado, setproductoSeleccionado] = useState('')    
    const [dataEmpaque, setDataEmpaque] = useState([])
    const [empaqueFiltrado,setempaqueFiltrado]= useState([]) 
    const [listProductos, setlistProductos] = useState([])  //guarda los datos para la tabla que muestro en remisiones
    const [cant,setCant] = useState('1') 

    useEffect(() =>{
      let total = listProductos.map((el) => parseInt(el.cantidad) * el.piezas)      
      console.log(total)
      let  sum = total.reduce((prev, next) => prev + next,0)      
      setDatatotalPiezas(sum)

    },[listProductos])

    useEffect( () => {
        db.transaction(
          tx => {               
            tx.executeSql("select inventario.clave as claves, inventario.producto as productos from inventario, similares where inventario.clave = similares.producto", [],  (tx, res) =>  {            
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

      const handleListaProductos = (item)=>{          
        setproductoSeleccionado(item.productos) //almaceno el producto seleccionado
        setempaqueFiltrado(dataEmpaque.filter(data => data.clave ==item.claves )) //filtra la lista de empaques             
      }

      const handleListaEmpaque = (item) =>{      
      
        setlistProductos([
          ...listProductos,{
          id: String(Math.random()),
          producto:productoSeleccionado,
          empaque:item.empaque,
          precio:'0', 
          cantidad:cant,
          total: '0',
          clave: item.clave,  //los necesito para el boton de aumentar y disminuir de remisiones
          piezas:item.piezas}
        ])     
  
        //limpiar ventana        
        setCant('1')        
        setempaqueFiltrado([])        
      }

      const changeCantidad = (cant) => {      
        setCant(cant)
        setempaqueFiltrado([]) //necesito actualizar el estado de la variable cada vez que la modifico     
      }

      const aumentar = (item) =>{
        let data = [...listProductos] 
        let index = (data.findIndex((x) => x.id == item.id))      
        data[index].cantidad = parseInt(data[index].cantidad)+1              
        setlistProductos(data)
      }

      const disminur = (item) =>{
        let data = [...listProductos] 
        let index = (data.findIndex((x) => x.id == item.id)) 
        if (parseInt(data[index].cantidad) > 1) {  
          data[index].cantidad = parseInt(data[index].cantidad)-1              
          setlistProductos(data)
        }
        
        
      }

     console.log(listProductos)

    return( 
      
        <ImageBackground source={Interface.fondo} style={{flex:1}}>
          <ScrollView >
            <View style={Interface.container}>
                <Text style={styles.text}>{cantidad} {empaque.empaque} {producto}  Piezas: {cantidad * empaque.piezas}</Text>
                <Text style={styles.text}>  Piezas agregadas: {totalPiezas}</Text>
                <TextInput placeholder="Cantidad" value={cant} style={styles.input} onChangeText={(x) => changeCantidad(x)}/>

            </View>

            <View style={{flex:1}}>
               <FlatList 
                    style={Interface.container}
                    data={dataInventario}            
                    keyExtractor={(item) =>item.claves}
                    renderItem={({item}) => <TouchableOpacity onPress={ () => handleListaProductos(item)}>                
                                                <Text style={styles.text}>{item.productos}</Text>
                                            </TouchableOpacity>}
                /> 

            </View >

            <View style={{flex:1}}>
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
                                <AntDesign name="pluscircleo" size={24} color={Interface.colorText} onPress={ () => handleListaEmpaque(item)} />                      
                              </View>
                            </View>  
                          )                                   
                          
                      }
                      }
                  />
            </View>

            <View style={{flex:1}}>
               <FlatList 
                    style={Interface.container}
                    data={listProductos}            
                    keyExtractor={(item) =>item.id}
                    renderItem={({item}) => <View style={{flex:1,flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
                                                <Text style={styles.text}>{item.cantidad} - {item.empaque} {item.producto}</Text>
                                                <AntDesign name="pluscircleo" size={24} color="#3F3DE0" onPress={() => aumentar(item)}/>
                                                <AntDesign name="minuscircleo" size={24} color="#3F3DE0" onPress={() => disminur(item,parseInt(item.cantidad))}/>
                                                <AntDesign name="delete" size={24} color="#3F3DE0" onPress={() => setlistProductos(listProductos.filter((data)=> data.id !==item.id))}/>
                                            </View>}                                            
                /> 
            </View >
          </ScrollView> 
        </ImageBackground>
            
    )
}

const styles = StyleSheet.create({
    input:{
        borderBottomWidth:2,
        borderColor:'white',
        marginTop:10,
        color:Interface.colorText
      },
      text:{
        color:Interface.colorText,
        fontWeight:"bold"
      }
})

export default similaresScreen

