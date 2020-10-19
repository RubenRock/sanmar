import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, StyleSheet,Picker, FlatList} from 'react-native'

function Remisiones({navigation, route}){
    const {dataTable} = route.params

    console.log(dataTable)

    

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
      <FlatList 
            style={styles.header}
            data={dataTable}
            //keyExtractor={}
            renderItem={({item}) => 
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>                
                  <Text  >{item.cantidad} - {item.empaque} {item.producto}  ${item.precio}</Text>             
                  <Button title="Accion 1" />                                               
                </View>
                }
          />
        
      </View>
    );
}

  export default Remisiones

  const styles = StyleSheet.create({
    header:{
      marginTop:20,
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
    },
    lists:{
      backgroundColor:'#dfe6e9',
      borderRadius:10,
      padding:5,
      marginHorizontal:5,
      marginTop:20,      
      borderWidth:2,
      borderColor:'black',
      
    }
})