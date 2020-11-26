import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert,ImageBackground } from 'react-native'
import * as SQLITE from 'expo-sqlite'
import * as Interface from '../components/interface'

const db = SQLITE.openDatabase("db.db");



const borrartodoSql = () => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from inventario;`, [])        
        tx.executeSql(`delete from empaques;`, [])        
      },
      (e) => console.log(e.message),//error
      () => console.log('Borrado'))// exito
  }

function DescargarInventario (){    
    const [dataInventario, setDataInventario] = useState() //miarroba
    const [dataEmpaque, setDataEmpaque] = useState() //miarroba
    const [dataListaSimilar, setDataListaSimilar] = useState() //miarroba
    const [dataSimilar, setDataSimilar] = useState() //miarroba

     //llenar db local con los datos de la nube    
    const agregarSql = () => {        
        db.transaction(
          tx => {       
            let empaque =''
            dataInventario.forEach(
                (ele) => tx.executeSql("insert into inventario (clave, producto, iva, usuario, fecha , ieps) values (?, ?, ?, ?, ?, ?)", [ele.clave, ele.producto, ele.iva, ele.usuario, ele.fecha, ele.ieps])                
            )
            
            dataEmpaque.forEach(
              ele => {
                ele.empaque == '6' ? empaque='SEIS' : ele.empaque == '12' ? empaque='DOCE' : empaque= ele.empaque                
                tx.executeSql("insert into empaques (clave, empaque, precio, piezas, barras , id) values (?, ?, ?, ?, ?, ?)", [ele.clave, empaque, ele.precio, ele.piezas, ele.barras, ele.id])
              }
            )
            
            dataListaSimilar.forEach(
              (ele) => tx.executeSql("insert into listasimilar (clave, descripcion) values (?, ?)", [ele.clave, ele.descripcion])                
            )

            dataSimilar.forEach(
              (ele) => tx.executeSql("insert into similares (clave, producto) values (?, ?)", [ele.clave, ele.producto])                
            )

          },(e) => alert(e.message),//error
          () =>  Alert.alert(
            "Inventario Actualizado",
            "Puedes continuar",
            [              
              { text: "Cerrar" }
            ],
            { cancelable: false }
          ))
      }

      //llamamos los datos del inventario de miarroba
    /* useEffect(() => {
      const fetchInventario = async () => {       
        const response = await fetch('https://cors-anywhere.herokuapp.com/' +'https://mysilver.webcindario.com/Tiendas/SMinventario.json')   
        console.log(response)
        const data = await response.json()       
        let simpleData =''               
        
        //el objeto que traigo con fetch tiene muchas ramas, lo hago mas corto con este codigo
        for (let index = 0; index < data.FDBS.Manager.TableList[0].RowList.length; index++) {
          simpleData = [data.FDBS.Manager.TableList[0].RowList[index].Original,...simpleData]
        }
        setDataInventario(simpleData)                      
      } 

      const fetchEmpaque = async () => {       
        const response = await fetch('https://cors-anywhere.herokuapp.com/' +'https://mysilver.webcindario.com/Tiendas/SMempaque.json')   
        console.log(response)
        const data = await response.json()       
        let simpleData =''               
        
        //el objeto que traigo con fetch tiene muchas ramas, lo hago mas corto con este codigo
        for (let index = 0; index < data.FDBS.Manager.TableList[0].RowList.length; index++) {
          simpleData = [data.FDBS.Manager.TableList[0].RowList[index].Original,...simpleData]
        } 

        
        setDataEmpaque(simpleData)                      
      }
      fetchInventario()
      fetchEmpaque()
    },[])  */  

    useEffect(() => {
      const fetchInventario = async () => {       
        const response = await fetch('https://vercel-api-eta.vercel.app/api/inventario' )
        
        const data = await response.json()       
        setDataInventario(data)        
      }

      const fetchEmpaque = async () => {       
        const response = await fetch('https://vercel-api-eta.vercel.app/api/empaque' )
        
        const data = await response.json()       
        setDataEmpaque(data)        
      }

      const fetchListaSimilar = async () => {       
        const response = await fetch('https://vercel-api-eta.vercel.app/api/listasimilar' )
        
        const data = await response.json()       
        setDataListaSimilar(data)        
      }

      const fetchSimilar = async () => {       
        const response = await fetch('https://vercel-api-eta.vercel.app/api/similares' )
        
        const data = await response.json()       
        setDataSimilar(data)        
      }


      fetchInventario()
      fetchEmpaque()
      fetchListaSimilar()
      fetchSimilar()
    },[])   

return(          
    <ImageBackground source={Interface.fondo} style={{flex:1, justifyContent:"center",}}>
        <View style={Interface.container}>
          <Text style={styles.texto}>Aqui puedes actualizar tu inventario</Text>
          {dataSimilar ==undefined && <ActivityIndicator />}
          {dataSimilar && dataEmpaque && 
              <TouchableOpacity onPress={() => {
                borrartodoSql()
                agregarSql()}}>
                <Text style={[Interface.boton,{marginTop:50,width:"100%" }]}>Actualizar</Text>
              </TouchableOpacity>                
          }
        </View>
    </ImageBackground>    
)
}

const styles = StyleSheet.create({
  boton:{    
    marginHorizontal:20,
    marginTop:50,               
  },
  texto:{
    marginTop:10,
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
    color:Interface.colorText
  }
})


export default DescargarInventario