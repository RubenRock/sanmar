import React, { useState, useEffect } from 'react'
import {View, ImageBackground,Text, TextInput, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import * as Interface from '../components/interface'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db");

function similaresScreen({navigation, route}){
    const {cantidad, producto, empaque} = route.params  

    const [dataInventario, setDataInventario] = useState([])

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
            })
          },
          (e) => console.log(e.message))
      },[])
    
    console.log(dataInventario)

    return(      
        <ImageBackground source={Interface.fondo} style={{flex:1}}>            
            <View style={Interface.container}>
                <Text>{cantidad} {empaque.empaque} {producto}  Piezas: {cantidad * empaque.piezas}</Text>
                <TextInput placeholder="Cantidad" style={styles.input}/>

            </View>

            <View style={{flex:1}}>
               <FlatList 
                    style={Interface.container}
                    data={dataInventario}            
                    keyExtractor={(item) =>item.claves}
                    renderItem={({item}) => <TouchableOpacity >                
                                                <Text>{item.productos}</Text>
                                            </TouchableOpacity>}
                /> 

            </View >

            <View style={{flex:1}}>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    input:{
        borderBottomWidth:2,
        borderColor:'white',
        marginTop:10,
        color:Interface.colorText
      }
})

export default similaresScreen

