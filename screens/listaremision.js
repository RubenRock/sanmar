import React, {useEffect, useState} from 'react'
import {View, Text,FlatList, StyleSheet,TouchableOpacity, Button, TextInput} from 'react-native'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db")

function listaRemisionScreen(){
  const [filtro, setFiltro]= useState(false)
  const [remisiones, setRemisiones]= useState([])  
  const [listaRemision, setListaRemision] = useState([])
  const [data, setData]= useState([]) // listado de remisones de esta Screen
  const [folios, setFolios] = useState({inicio:'',fin:''})


 

  const mandarNube = async () => {
    
     
     let index =folios.inicio
    while (index <= folios.fin) {
      const responde = await fetch('https://vercel-api-eta.vercel.app/api/listaremision',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(
          {"folio":listaRemision[index].folio,
          "cliente": listaRemision[index].cliente,
          "total": listaRemision[index].total,
          "fecha": listaRemision[index].fecha,
          "vendedor":listaRemision[index].vendedor,
          "condicion":listaRemision[index].condicion,
          "estado":listaRemision[index].estado,
          "domicilio":listaRemision[index].domicilio,
          "impresion":listaRemision[index].impresion,
          "descuento":listaRemision[index].descuento}
        )
      })

      if (responde.status == 204)  
        console.log('exito: '+index) 
      else {  // cuando hay error
        const error = await responde.json()    
        console.log('Hay error: '+ error.details)    
      }    
      

      index++
      
    }
     
    
  }
  
  function obtenerLista (){ 
    let alisteRemision = []   
    db.transaction(
      tx => {
        tx.executeSql("select * from lista_remision where folio >= ? and folio <= ?", [folios.inicio+'.0', folios.fin+'.0'],  (tx, res) =>  {            
          let index = 0
          while (index < res.rows.length) {            
            alisteRemision.push(res.rows.item(index))
            index++              
          }    
          
          setListaRemision(alisteRemision)
      },
      (e) => console.log(e.message))
    })
  }

  const obtenerRemisiones = () =>{
    let aremision = []
    db.transaction(
      tx => {                                                                       //la bd le agrega .0 al folio
         tx.executeSql("select * from remisiones where folio >= ? and folio <= ?", [folios.inicio+'.0', folios.fin+'.0'],  (tx, res) =>  {            
            let index = 0
            while (index < res.rows.length) {
              aremision = [...aremision,res.rows.item(index)]
              index++              
            }    
           
            setRemisiones(aremision)
        },
        (e) => console.log(e.message))         
      })
  }

  const handleBoton = () => {
      obtenerRemisiones()
      obtenerLista()
      setFiltro(true)
      
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
            setData(resul)
        },
        (e) => console.log(e.message))
      })
    },[])
    
    return(
        <View>
            <View style={styles.header}>
              {folios.inicio <= folios.fin && folios.fin.trim() !== '' && folios.inicio.trim() !== '' && filtro == false?
                <View style={styles.boton}>
                  <Button  title="Seleccionar folios" onPress={() =>handleBoton()}/>                  
                </View>
                :null
              }

              {filtro?
                <View style={styles.boton}>
                    <Button color='red' title="Mandar a la nube" onPress={() =>mandarNube()}/>                  
                  </View>
                  :null
              }
              <View>
                <TextInput style={styles.input} 
                  placeholder="Folio inicial" 
                  onChangeText={(val) => setFolios({...folios, inicio:val})}
                  keyboardType='numeric'                  
                />
                <TextInput style={styles.input} 
                  placeholder="Folio final"
                  onChangeText={(val) => setFolios({...folios, fin:val})}
                  keyboardType='numeric'
                />
              </View>
            </View>            

            <FlatList             
            data={data}
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