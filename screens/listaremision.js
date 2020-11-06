import React from 'react'
import {View, Text} from 'react-native'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db");

const leerSql = (product, precio) => {
    db.transaction(
      tx => {               
        tx.executeSql("select * from inventario", [],  (tx, res) =>  {            
            let resul = [];let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }    
            console.log(resul)
      },
      (e) => console.log(e.message))
  })
}

leerSql()

function listaRemisionScreen(){
    return(
        <View>
            <Text>Hola desde lista Remision</Text>
        </View>
    )

}

export default listaRemisionScreen