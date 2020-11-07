import React, {useEffect, useState} from 'react'
import {View, Text,FlatList, StyleSheet,TouchableOpacity, Button, TextInput} from 'react-native'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db")

function listaRemisionScreen(){
  const [remisiones, setRemisiones]= useState([])
  const [folios, setFolios] = useState({inicio:'',fin:''})

 

  const mandarNube = async () => {
    const responde = await fetch('https://vercel-api-eta.vercel.app/api/listaremision',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(
        {"folio":"8",
        "cliente": "Pau",
        "total": "100",
        "fecha": "01/01/20",
        "vendedor":"admin",
        "condicion":"contado",
        "estado":"pendiente",
        "domicilio":"centro",
        "impresion":"serie",
        "descuento":"4"}
      )
    })

    //const data = await responde.json()
    if (responde.status !== 204) console.log('hay error:'+ responde.details)
    else
    console.log('esta bien')
    
  }

  const handleBoton = () => {
    db.transaction(
      tx => {                                                                       //la bd le agrega .0 al folio
        tx.executeSql("select * from remisiones where folio >= ? and folio <= ?", [folios.inicio+'.0', folios.fin+'.0'],  (tx, res) =>  {            
            let resul = [];let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }    
            console.log(resul)
        },
        (e) => console.log(e.message))
        mandarNube()
        
      })

  }
  
  useEffect (() => {
    db.transaction(
      tx => {               
        tx.executeSql("select * from lista_remision", [],  (tx, res) =>  {            
            let resul = [];let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }    
            setRemisiones(resul)
        },
        (e) => console.log(e.message))
      })
    },[])
    
    return(
        <View>
            <View style={styles.header}>
              <View style={styles.boton}>
                <Button  title="Mandar a la nube" onPress={() =>handleBoton()}/>
              </View>
              <View>
                <TextInput style={styles.input} 
                  placeholder="Folio inicial" 
                  onChangeText={(val) => setFolios({...folios, inicio:val})}
                />
                <TextInput style={styles.input} 
                  placeholder="Folio final"
                  onChangeText={(val) => setFolios({...folios, fin:val})}
                />
              </View>
            </View>            

            <FlatList             
            data={remisiones}
            keyExtractor={(ele) => ele.folio}
            renderItem={({item}) =>
                <View style={styles.lista}>
                  <TouchableOpacity onPress={() => alert(item.folio) }>
                    <Text style={styles.texto} >Folio: {parseInt(item.folio)}    Cliente: {item.cliente} </Text>
                    <Text style={[styles.texto, styles.texto_pequeño]} >Total: ${item.total}   Fecha: {item.fecha}</Text>
                    <Text style={[styles.texto, styles.texto_pequeño]} >Domicilio: {item.domicilio}</Text>
                  </TouchableOpacity>
                </View>
              }
            />            
        </View>
    )

}

const styles = StyleSheet.create({
  lista:{    
    padding:5,
    backgroundColor:"#00AFF0",
    marginTop:5,
    marginHorizontal:5,   
    borderRadius:10,
  },
  texto:{
    color:'white',
  },
  texto_pequeño:{
    fontSize:12
  },
  header:{
    flexDirection:"row",
    justifyContent:'flex-end'
  },
  input:{
    borderBottomWidth:1,
    marginTop:5,
    marginHorizontal:10,
  },
  boton:{
    margin:10
  }


})

export default listaRemisionScreen