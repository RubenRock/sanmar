import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, StyleSheet,Picker, FlatList} from 'react-native'

function Remisiones({navigation, route}){
    const {dataTable} = route.params

    const [selectedValue, setSelectedValue] = useState('CONTADO')
    const [currentDate, setCurrentDate] = useState('Cargando..');
    const [counter, setCounter] = useState(1);    

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
           
    },[counter]) 

   
    
    let data= dataTable    
    console.log(data)
    

    const aumentar = item =>{           
      let id = (data.findIndex((x) => x.id == item.id))
      setCounter(counter+1)      
      data[id].cantidad = counter                
     
    }

    const disminur = item =>{           
      let id = (data.findIndex((x) => x.id == item.id))
      setCounter(counter-1)      
      data[id].cantidad = counter                
      
     
    }
    

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start',padding:10, backgroundColor:'white'}}>          
      <View style={styles.header}>        
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <Button title="guardar" />
          <Button title="limpiar" />
        </View>
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
        <Text>counter: {counter}</Text>
        <Button title='Productos' onPress={() => navigation.navigate('Datos')} />
      </View>
      <FlatList 
            style={styles.header}
            data={data}
            //keyExtractor={}
            renderItem={({item}) => 
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>                
                  <Text  style={{flex:2}}>{item.cantidad} - {item.empaque} {item.producto}  ${item.precio}  ${item.total} </Text>             
                  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <Button title="+" onPress={() => aumentar(item)}/>
                    <Button title=" - " onPress={() => disminur(item)}/>
                    <Button title="borrar" />                                               
                  </View>
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