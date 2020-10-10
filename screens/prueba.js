import React from 'react'
import {View, Text, TextInput} from 'react-native'

function prueba({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>          
        <TextInput placeholder="escribe algo aqui"></TextInput>
            <Text>Hola desde prueba</Text>
        
      </View>
    );
  }

  export default prueba