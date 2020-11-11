import React from 'react'
import {Button, Text, View} from 'react-native'
import * as SQLITE from 'expo-sqlite'

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
        <View>
            <Text>formatear base de datos</Text>
            <Button title='formatear' onPress={() =>formatear()}/>
        </View>
    )
    
}

export default extrasScreen