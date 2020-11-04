import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import * as SQLITE from 'expo-sqlite'
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './firebaseconfig'

console.log(firebaseConfig)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbfirebase = firebase.firestore();

const orale = async () =>{
  const dbRef = dbfirebase.collection("SMINVENTARIO").doc("AZUCAR ESTANDAR");
    const doc = await dbRef.get();
    const user = doc.data();

console.log(user)}

orale()

const db = SQLITE.openDatabase("db.db");







/* useEffect(() => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_user', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
            []
          );
        }
      }
    );
  });
}, []);
 */
function pruebaScreen({ navigation }) {
  

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(['orale']);

  /* useEffect(() =>{
    db.transaction(tx => {
      tx.executeSql(        
        "create table if not exists articulos (id integer, producto text, precio text)");
    });    
  },[]) */
 
  useEffect(() => {
    const fetchInventario = async () => {       
      const response = await fetch('https://vercel-api-eta.vercel.app/api/inventario' )
      
      const data = await response.json()       
      setData(data)
      setLoading(false)  
      
      
    }
    fetchInventario()
  },[])    
  
  //console.log(data)

  const agregarSql = (product, precio) => {
    db.transaction(
      tx => {       
        tx.executeSql("insert into articulos (id, producto,precio) values (0, ?,?)", [product, precio]);        
        tx.executeSql("select * from articulos", [],(_,{ rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      (e) => console.log(e.message))
  }

  const borrarSql = (data) => {
    db.transaction(
      tx => {       
        tx.executeSql(`delete from articulos where rowid = ?;`, [data])        
      },
      (e) => console.log(e.message),//error
      console.log('Chido mi hermano'))// exito
  }

  const borrartodoSql = () => {
    db.transaction(
      tx => {       
        tx.executeSql(`delete from articulos;`, [])        
      },
      (e) => console.log(e.message),//error
      console.log('Chido mi hermano'))// exito
  }

  const modificarSql = (data, id) => {
    db.transaction(
      tx => {       
        tx.executeSql(`update articulos set producto = ? where  rowid = ?;`, [data, id])        
      },
      (e) => console.log(e.message),//error
      console.log('Cambio realizado'))// exito
  }
  
  const mostrarSql = () => {
    db.transaction(
      tx => {               
        tx.executeSql("select * from articulos", [], (tx, res) =>  console.log(res.rows) );
      },
      (e) => console.log(e.message))
  }
 

  return (
    <View style={{ flex: 1, padding: 24 }}>
      
      {isLoading ?  <ActivityIndicator/> : (
        <>
          <Text>Cargo</Text>     
          <Button title="agregar" onPress={()=>agregarSql('azucar','10.5')}/>
          <Button title="borrar" onPress={()=>borrarSql('2')}/>
          <Button title="modificar" onPress={()=>modificarSql('lechita', '1')}/>
          <Button title="borrar todo" onPress={()=>borrartodoSql('lechita', '1')}/>
          <Button title="mostar" onPress={()=>mostrarSql('lechita', '1')}/>
        </>
      )}
    </View>
  );
};

export default pruebaScreen