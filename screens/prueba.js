import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import * as SQLITE from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

console.log(FileSystem.documentDirectory)
const db = SQLITE.openDatabase("db.db");
//const db = SQLITE.openDatabase('../lib/NEWDB.s3db')






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

  useEffect(() =>{
    db.transaction(tx => {
      tx.executeSql(        
        "create table if not exists articulos (id integer, producto text, precio text)");
    });    
  },[])
 
  useEffect(() => {
    const fetchInventario = async () => {       
      const response = await fetch('https://vercel-serverless.rubenrock.vercel.app/api/platillos' )
      
      const data = await response.json()       
      setData(data)
      setLoading(false)  
      
      
    }
    fetchInventario()
  },[])   
  
  //console.log(data)

  const agregarSql = (data) => {
    db.transaction(
      tx => {       
        tx.executeSql("insert into items (done, value) values (0, ?)", [data]);        
        tx.executeSql("select * from items", [],(_,{ rows }) =>
          console.log(JSON.stringify(rows))
        );
      })
  }

  const borrarSql = (data) => {
    db.transaction(
      tx => {       
        tx.executeSql(`delete from items where id = ?;`, [data])        
      },
      (e) => console.log(e.message),//error
      console.log('Chido mi hermano'))
  }
  
 

  return (
    <View style={{ flex: 1, padding: 24 }}>
      
      {isLoading ?  <ActivityIndicator/> : (
        <>
          <Text>Cargo</Text>     
          <Button title="agregar" onPress={()=>agregarSql('joder')}/>
          <Button title="borrar" onPress={()=>borrarSql('2')}/>
        </>
      )}
    </View>
  );
};

export default pruebaScreen