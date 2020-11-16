import React, {useEffect, useState} from 'react'
import {View, Text,FlatList, StyleSheet,TouchableOpacity, Button, TextInput, Alert} from 'react-native'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db")

function listaRemisionScreen(){   
  const [remisiones, setRemisiones]= useState([])  
  const [listaRemision, setListaRemision] = useState([])
  const [data, setData]= useState([]) // listado de remisones de esta Screen
  const [folios, setFolios] = useState({inicio:'',fin:''})


 

  const mandarNube = async () => {  
    let fallo = false, info=''
    console.log('----lista remision------')
     //index para whille, i para arreglo que se va a guardar
     let index =parseInt(folios.inicio),i=0
    while (index <= parseInt(folios.fin)) {
      
      const responde = await fetch('https://vercel-api-eta.vercel.app/api/listaremision',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(
          {"folio":listaRemision[i].folio,
          "cliente": listaRemision[i].cliente,
          "total": listaRemision[i].total,
          "fecha": listaRemision[i].fecha,
          "vendedor":listaRemision[i].vendedor,
          "condicion":listaRemision[i].condicion,
          "estado":listaRemision[i].estado,
          "domicilio":listaRemision[i].domicilio,
          "impresion":listaRemision[i].impresion,
          "descuento":listaRemision[i].descuento}
        )
      })

      if (responde.status !== 204) {  // cuando hay error
        const error = await responde.json()    
        console.log('Hay error: '+ error.details) 
        info= error.details          
        fallo= true
      } 
      index++
      i++

    }
      console.log('----remisiones------')
      
     
     index =0
     while (index <= remisiones.length-1) {
         
        const responde = await fetch('https://vercel-api-eta.vercel.app/api/remisiones',{
         method:'POST',
         headers:{
           'Content-Type':'application/json',
         },
         body:JSON.stringify(
           {"folio":remisiones[index].folio,
           "id":remisiones[index].rowid,
           "cantidad": remisiones[index].cantidad,
           "producto": remisiones[index].producto,
           "total": remisiones[index].total,
           "tipo":remisiones[index].tipo,
           "empaque":remisiones[index].empaque,
           "descuento":remisiones[index].descuento}
         )
       })
       
       if (responde.status !== 204){  // cuando hay error
         const error = await responde.json()    
         console.log('Hay error: '+ error.details)    
         info= error.details
         fallo= true
       }    
      

      index++     
      
    }

    !fallo ?   Alert.alert(
      "Correcto",
      "se mandaron los datos a la nube",
      [              
        { text: "Cerrar" }
      ],
      { cancelable: false }
    )
    :  Alert.alert(
      "Error",
      info, //me dice cual es el error
      [              
        { text: "Cerrar" }
      ],
      { cancelable: false }
    )    
    
  }
  
  useEffect(() =>{  
    console.log('datos en listaremision: '+listaRemision.length)
    listaRemision.length ? mandarNube()
    : null
  },[listaRemision])

  function obtenerLista (){ 
    let alisteRemision = []   
    db.transaction(
      tx => {
        tx.executeSql("select * from lista_remision where folio >= ? and folio <= ?", [folios.inicio, folios.fin],  (tx, res) =>  {            
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
      tx => {                                                                       
         tx.executeSql("select * from remisiones where folio >= ? and folio <= ?", [folios.inicio, folios.fin],  (tx, res) =>  {            
            let index = 0, extra ='',extra2=''
            while (index < res.rows.length) {
              extra= res.rows.item(index) 
              //agrego campo rowid para el id del documento de firebase
              extra2 = Object.assign({'rowid':index},extra)              
              aremision = [...aremision,extra2]              
              index++              
            }    
           
            setRemisiones(aremision)
        },
        (e) => console.log(e.message))         
      })
  }

  const deleteRemisiones = async () => {       
     let responde = await fetch('https://vercel-api-eta.vercel.app/api/listaremision/',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
        }
      })      
      
      if (responde.status == 200)  
        console.log('exito borrar lista remisiones') 
      else {  // cuando hay error
        const error = await responde.json()    
        console.log('Hay error: '+ error.details)    
      }   

     responde = await fetch('https://vercel-api-eta.vercel.app/api/remisiones',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
        }
      })            
      if (responde.status == 200)  
        console.log('exito borrar remisiones') 
      else {  // cuando hay error
        const error = await responde.json()    
        console.log('Hay error: '+ error.details)    
      } 
  }

  const handleBoton = async() => {
      await deleteRemisiones() 
      obtenerRemisiones()
      obtenerLista() 
          
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
              {parseInt(folios.inicio) <= parseInt(folios.fin) && folios.fin.trim() !== '' && folios.inicio.trim() !== '' ?
                <View style={styles.boton}>
                  <Button  title="Mandar a nube" onPress={() =>handleBoton()}/>                  
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
            keyExtractor={(ele) => String(ele.folio)}
            renderItem={({item}) =>
                <View style={styles.lista}>
                  <TouchableOpacity onPress={() => alert(item.folio) }>
                    <Text style={styles.texto} >Folio: {(item.folio)}    Cliente: {item.cliente} </Text>
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
    marginTop:10,
    marginHorizontal:5,   
    borderRadius:10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    
    elevation: 11,
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