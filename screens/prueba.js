import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import * as SQLITE from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';

console.log(FileSystem.documentDirectory)
const db = SQLITE.openDatabase('../lib/NEWDB.s3db')

console.log(db)



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

  useEffect(() => {
    const fetchInventario = async () => {       
      const response = await fetch('https://vercel-serverless.rubenrock.vercel.app/api/platillos' )
      
      const data = await response.json()       
      setData(data)
      setLoading(false)  
      
      
    }
    fetchInventario()
  },[])   
  console.log(data)

 /*  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []); */

  return (
    <View style={{ flex: 1, padding: 24 }}>
      
      {isLoading ? <ActivityIndicator/> : (
        <Text>Cargo</Text>     
      )}
    </View>
  );
};

export default pruebaScreen