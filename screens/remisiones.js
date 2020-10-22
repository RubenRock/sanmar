import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, StyleSheet,Picker, FlatList} from 'react-native'

function Remisiones({navigation, route}){
    const {dataTable} = route.params

    const [selectedValue, setSelectedValue] = useState('CONTADO')
    const [currentDate, setCurrentDate] = useState('Cargando..');    
    const [table, setTable] = useState([]);    
    const [total, setTotal] = useState(0)


    useEffect(() => {                 
      setTable(dataTable)      
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
    },[route]) 

    let data = [...table] 

    //al realizar cualquier modificacion en "table" realizamos la suma 
    useEffect( () => {
      let total = data.map((el) => parseFloat(el.total))      
      let  sum = total.reduce((prev, next) => prev + next,0)      
      setTotal(sum)
    },[table])
    
    
    const aumentar = (item,cant) =>{              
      let id = (data.findIndex((x) => x.id == item.id))      
      data[id].cantidad = cant+1     
      data[id].total = (cant+1)*data[id].precio
      //let newTable = table.map(el => el.id ==item.id ? {...el,cantidad:cant+1}: el)      
      setTable(data)      
    }

    const disminur = (item,cant) =>{          
      let id = (data.findIndex((x) => x.id == item.id))      
      data[id].cantidad = cant-1      
      data[id].total = (cant-1)*data[id].precio
      setTable(data)
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
          <Button title='Productos' onPress={() => navigation.navigate('Datos', {dataTable: table})} />
        </View>

        <Text>total: {total}</Text>

      <FlatList 
            style={styles.header}
            data={table}
            //keyExtractor={}
            renderItem={({item}) => 
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>                
                  <Text  style={{flex:2}}>{item.cantidad} - {item.empaque} {item.producto}  ${item.precio}  ${item.total} </Text>             
                  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <Button title="+" onPress={() => aumentar(item,parseInt(item.cantidad))}/>
                    <Button title=" - " onPress={() => disminur(item,parseInt(item.cantidad))}/>
                    <Button title="borrar" onPress={() => setTable(table.filter((data)=> data.id !==item.id))}/>                                               
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