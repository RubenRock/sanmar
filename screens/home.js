import React, {useEffect} from 'react'
import {View, Text, Button, TouchableOpacity} from 'react-native'
import { RotationGestureHandler } from 'react-native-gesture-handler';

function HomeScreen({ navigation,route }) {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Remisiones')}>
            <Text>Remisiones</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Lista de remisiones</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Ajustes</Text>
          </TouchableOpacity>
        <Button
          title="Menus.."
          
        />
      </View>
    );
  }

  export default HomeScreen