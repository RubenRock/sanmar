import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, StyleSheet,Picker, FlatList, Alert} from 'react-native'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db");


function Remisiones({navigation, route}){
    const {dataTable, encabezado} = route.params    
    
    const [currentDate, setCurrentDate] = useState('Cargando..');    
    const [table, setTable] = useState([]);    
    const [mayoreo, setMayoreo] = useState({total:'',cantidad:0});    
    const [total, setTotal] = useState(0)
    const [header, setHeader]= useState({name:'',direccion:'',condicion:'CONTADO'})
    const [folio, setFolio] = useState("1")

  
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

    
    
    const handlePrice =  (item,cantidad) => {      
      let resul, datos =[]
      db.transaction(
         tx => { 
           tx.executeSql("select * from empaques where clave = ?", [item.clave],  (tx, res) =>  {            
             let index = 0
            
              while (index < res.rows.length) {
                datos = [...datos,res.rows.item(index)]
                
                index++              
              }
              let arrayseis= datos, arraydoce = datos
             
              let seis = arrayseis.filter((ele) => ele.empaque == 'SEIS' && item.piezas == ele.piezas)                   

              let doce = arraydoce.filter((ele) => ele.empaque == 'DOCE' && item.piezas == ele.piezas)      

              resul = ''

              if (cantidad == '6')  {if (seis.length)  resul = parseFloat(seis[0].precio).toFixed(2)}

              if (cantidad % 12 == 0)  {if (doce.length) resul = parseFloat((cantidad/12)*doce[0].precio).toFixed(2)}

              if (resul == '')  resul= item.precio 

              setMayoreo({total:resul, cantidad:cantidad,id:item.id})

              
            })
        }
      )              
    }

    

    useEffect(() => {
      console.log(mayoreo)
      if (mayoreo.cantidad){
        let data = [...table] 
        let id = (data.findIndex((x) => x.id == mayoreo.id))      
        data[id].cantidad = mayoreo.cantidad     
        data[id].precio = parseFloat(mayoreo.total/mayoreo.cantidad).toFixed(2)
        data[id].total = mayoreo.total*mayoreo.cantidad
        setTable(data)
      }
    },[mayoreo])

    const aumentar = (item,cant) =>{              
      handlePrice(item,cant+1)           
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
      borderRadius:10,
      padding:8,
      alignSelf:'stretch',

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      
      elevation: 11,
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