import React from 'react'
import {TouchableOpacity, Text, View, ImageBackground, StyleSheet} from 'react-native'
import * as SQLITE from 'expo-sqlite'
import * as Interface from '../components/interface'

const db = SQLITE.openDatabase("db.db");

const formatear = () =>{
    db.transaction(tx => {
        tx.executeSql("drop table articulos ",[],(e)=>console.log(e),()=>console.log("borrado articulos"));
        tx.executeSql("drop table inventario ",[],(e)=>console.log(e),()=>console.log("borrado inventario"));
        tx.executeSql("drop table lista_remision ",[],(e)=>console.log(e),()=>console.log("borrado lista_remision"));
        tx.executeSql("drop table remisiones ",[],(e)=>console.log(e),()=>console.log("borrado remisiones"));
        tx.executeSql("drop table empaques ",[],(e)=>console.log(e),()=>console.log("borrado empaques"));
      });
    db.exec
}

function extrasScreen() {

    return(
        <ImageBackground source={Interface.fondo} style={{flex:1,justifyContent:"center"}}>
            <View style={Interface.container}>
                <Text style={styles.text}> Formatear base de datos</Text>
                <TouchableOpacity onPress={() =>formatear()}>
                    <Text style={[Interface.boton,{marginTop:50, width:"100%",}]}>Formatear</Text>
                </TouchableOpacity>                
            </View>
        </ImageBackground>
    )
    
}

const styles = StyleSheet.create({
    text:{
        color:Interface.colorText,
        marginTop:10,
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
    }
})

export default extrasScreen