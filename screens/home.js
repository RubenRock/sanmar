import React from 'react'
import {View, Text, Button, TouchableOpacity} from 'react-native'



function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <TouchableOpacity onPress={() => navigation.navigate('Remisiones',{dataTable: ''})}>
        <Text>Remisiones</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Lista de remisiones</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text>Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InventarioNube')}>
          <Text>Descargar inventario de la Nube</Text>
        </TouchableOpacity>
      <Button
        title="Menus.."
        
      />
    </View>
  );
}

  export default HomeScreen