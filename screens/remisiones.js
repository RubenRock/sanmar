import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, StyleSheet,Picker} from 'react-native'

function Remisiones({navigation}){
    const [selectedValue, setSelectedValue] = useState('CONTADO')
    const [currentDate, setCurrentDate] = useState('perame');

    useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
        date + '/' + month + '/' + year 
        + ' ' + hours + ':' + min + ':' + sec
      );
    },[])    

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start',padding:10, backgroundColor:'white'}}>          
      <View style={styles.header}>
        <TextInput placeholder="Nombre del cliente" style={styles.input}/>  
        <TextInput placeholder="Domicilio" style={styles.input}/>  
        <Picker           
          selectedValue={selectedValue}
          //style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="CONTADO" value="CONTADO" />
          <Picker.Item label="PAGA AL RECIBIR" value="PAGA AL RECIBIR" />
          <Picker.Item label="CREDITO" value="CREDITO" />
        </Picker>        
        <Text>Fecha: {currentDate}</Text>
        <Button title='Productos' onPress={() => navigation.navigate('Datos')} />
      </View>
        
      </View>
    );
}

  export default Remisiones

  const styles = StyleSheet.create({
    header:{
      backgroundColor:'#dfe6e9',
      // borderWidth:1,
      // borderColor:'#81ecec',
      borderRadius:10,
      padding:8,
      alignSelf:'stretch'

    },
    input:{
      borderBottomWidth:2,
      borderColor:'#eee',
    }
})