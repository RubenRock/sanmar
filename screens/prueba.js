import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

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