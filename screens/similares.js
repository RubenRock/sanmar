import React from 'react'
import {View, ImageBackground,Text, TextInput, StyleSheet} from 'react-native'
import * as Interface from '../components/interface'

const productos = [
    {id:'1', producto:'azucar',precio:'20.5'},
    {id:'2', producto:'jabon',precio:'40'},
    {id:'3', producto:'leche',precio:'12.5'},

]

const empaques = [
  {id:'1', id_producto:'1',empaque:'kg',precio:'20.5',seis:'112'},
  {id:'2', id_producto:'1',empaque:'bulto',precio:'700'},
  {id:'3', id_producto:'2',empaque:'250g',precio:'11'},
  {id:'4', id_producto:'2',empaque:'caja',precio:'256'},
  {id:'5', id_producto:'3',empaque:'ltr',precio:'17', doce:'200'},
]

function similaresScreen({navigation, route}){
    const {cantidad, producto, empaque} = route.params
    console.log(cantidad+' '+producto+' '+empaque)

    return(      
        <ImageBackground source={Interface.fondo} style={{flex:1}}>            
            <View style={Interface.container}>
                <TextInput placeholder="Cantidad" style={styles.input}/>

            </View>

            <View style={Interface.container}>

            </View>

            <View style={Interface.container}>

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

