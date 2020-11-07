import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, StyleSheet,Picker, FlatList, Alert} from 'react-native'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db");


function Remisiones({navigation, route}){
    const {dataTable, encabezado} = route.params    
    
    const [currentDate, setCurrentDate] = useState('Cargando..');    
    const [table, setTable] = useState([]);    
    const [total, setTotal] = useState(0)
    const [header, setHeader]= useState({name:'',direccion:'',condicion:'CONTADO'})
    const [dataRemisiones, setDataRemisiones] = useState([])
    const [dataListaRemision, setDataListaRemision] = useState([])
    const [folio, setFolio] = useState("1")

   //llenar Remisiones y Lista_Remision
    const agregarSql = () => {        
      db.transaction(
        tx => {       
          dataRemisiones.forEach(
              (ele) => tx.executeSql("insert into remisiones values (?, ?, ?, ?, ?, ?, ?)", [ele.folio, ele.cantidad, ele.producto, ele.total, ele.tipo, ele.empaque, ele.descuento])
          )
          dataListaRemision.forEach(
            ele => tx.executeSql("insert into lista_remision values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [ele.folio, ele.cliente, ele.total, ele.fecha, ele.vendedor, ele.condicion, ele.estado, ele.domicilio, ele.impresion, ele.descuento])
          )            
        },
        (e) => console.log(e.message))//error
    }

    //obtenemos numero de folio de la remision

    const obtenerFolio = () => {
      db.transaction(
        tx => {                 
          tx.executeSql("select * from lista_remision", [],( _ ,{ rows }) =>
            rows.length > 0 ? setFolio(rows.length+1)
            : setFolio('1')
          )
        }
      )
    }

    useEffect(() =>{
     obtenerFolio()
    }, [])

    useEffect(() => {                 
      setTable(dataTable)      
      setHeader(encabezado)
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

    

    //al realizar cualquier modificacion en "table" realizamos la suma 
    useEffect( () => {
      let data = [...table] 
      let total = data.map((el) => parseFloat(el.total))      
      let  sum = total.reduce((prev, next) => prev + next,0)      
      setTotal(sum)
    },[table])
    
    
    const aumentar = (item,cant) =>{              
      let data = [...table] 
      let id = (data.findIndex((x) => x.id == item.id))      
      data[id].cantidad = cant+1     
      data[id].total = (cant+1)*data[id].precio      
      setTable(data)      
    }

    const disminur = (item,cant) =>{          
      let data = [...table] 
      let id = (data.findIndex((x) => x.id == item.id))      
      data[id].cantidad = cant-1      
      data[id].total = (cant-1)*data[id].precio
      setTable(data)
    }

    const handleGuardar = () => {
      if (table.length >0){
        if (header.name.trim()){     
          db.transaction(
            tx => {       
              tx.executeSql("insert into lista_remision values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [parseInt(folio), header.name, total, currentDate, "ADMIN", header.condicion, "PENDIENTE", header.direccion, "SERIE", "0" ]),
            
            dataTable.forEach( (ele) =>{
                tx.executeSql("insert into remisiones values (?, ?, ?, ?, ?, ?, ?)", [parseInt(folio), ele.cantidad, ele.producto, ele.total, "SERIE", ele.empaque,  "0"])
              })
            },
            (e) => console.log(e.message))    
        
          alert('Guardado correcto')
          handleClear()

        }else {
          alert('Escribe nombre del cliente')
        }
      }      
    }

    console.log(folio)
    const handleClear = () =>{
      setHeader({name:'',direccion:'',condicion:'CONTADO'})
      setTable([])
      setTotal('0')
      obtenerFolio()
    }

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start',padding:10, backgroundColor:'white'}}>          
        <View style={styles.header}>        
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Button title="guardar" onPress={() => handleGuardar()}/>
            <Button title="limpiar" onPress={() => handleClear()}/>
          </View>
          
          <Text>Folio: {folio} </Text>
          
          <TextInput 
            placeholder="Nombre del cliente" 
            style={styles.input}
            onChangeText={(val) => setHeader({...header,name:val.toUpperCase()}) }            
            value={header.name}
          />  
          <TextInput 
            placeholder="Domicilio" 
            style={styles.input}
            onChangeText={(val) => setHeader({...header,direccion:val.toUpperCase()})}  
            value={header.direccion}
          />  
          <Picker           
            selectedValue={header.condicion}
            //style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => {                
                setHeader({...header,condicion:itemValue})
              }}
              
          >
            <Picker.Item label="CONTADO" value="CONTADO" />
            <Picker.Item label="PAGA AL RECIBIR" value="PAGA AL RECIBIR" />
            <Picker.Item label="CREDITO" value="CREDITO" />
          </Picker>        
          <Text>Fecha: {currentDate}</Text>          
          <Button title='Productos' onPress={() => navigation.navigate('Datos', {dataTable: table, encabezado: header})} />
        </View>

        <Text>total: {total}</Text>

      <FlatList 
            style={styles.header}
            data={table}
            //keyExtractor={}
            renderItem={({item}) => 
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{flex:2, marginTop:10}}>
                    <Text>{item.cantidad} - {item.empaque} {item.producto}</Text>
                    <Text  >     P.U.:  ${item.precio}      TOTAL: ${item.total} </Text>                                 
                  </View>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
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
      
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})