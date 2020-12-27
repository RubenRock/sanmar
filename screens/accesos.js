import React, { useEffect, useState } from 'react'
import {TouchableOpacity, Text, View, ImageBackground, StyleSheet, FlatList} from 'react-native'
import * as Interface from '../components/interface'
import { AntDesign } from '@expo/vector-icons'
import {useSelector} from 'react-redux'

import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db");


function accesosScreen() {
    const [usuarios, setUsuarios] = useState(useSelector(state => state.usuarios))
    const [accesos, setAccesos] = useState([])   
    let accesos2 =useSelector(state => state.accesos)
    

    const agregarAcceso = (usuario, acceso) =>{    
        accesos2 = [...accesos2,{login:usuario,acceso:acceso}]
        setAccesos(accesos2)     
        console.log(accesos2)
        
        /* let busca = accesos
        busca = busca.filter(x => x.login == usuario)        
        if (busca.length == 0 ){ 
            db.transaction(
                    tx => {       
                    tx.executeSql("insert into accesos (login, acceso) values (?, ?)", [usuario, acceso])                
                }, 
                    error => console.log(error),            
                )      
          
        } else 
            alert('ya esta con acceso') */
    }

    const borrarAcceso = usuario => {
        let aux = []                       
        accesos.forEach(element => {
            if (element.login != usuario)
                aux = [...aux,element]
        });
        
        setAccesos(aux)
        
      /*   db.transaction(
            tx => {       
               tx.executeSql("delete from accesos where login = ?", [usuario])                
        }, 
            error => console.log(error),
           
        )   */

    }

    return(
        <ImageBackground source={Interface.fondo} style={{flex:1,justifyContent:"center"}}>
            <View style={Interface.container}>
                <Text style={styles.text}> Accesos de la App</Text>
                
                <View style={{height:250}}>
                    <FlatList 
                        style={Interface.container}
                        data={usuarios}            
                        keyExtractor={(item) =>item.password}
                        renderItem={({item}) => <TouchableOpacity style={{marginBottom:10, flexDirection:'row',justifyContent:'space-between'}} onPress={ () => console.log('pushaste')}>                                                                
                                                    <Text style={styles.textList}>{item.login}</Text>
                                                    <AntDesign name="pluscircleo" size={24} color={Interface.colorText} onPress={ () =>  agregarAcceso(item.login,'ACTIVO')} />                      
                                                </TouchableOpacity>}
                    />                           
                </View>  

                <Text style={styles.text}> Usuarios con accesos </Text>
                
                <View style={{marginBottom:15}}>
                    <FlatList 
                        style={Interface.container}
                        data={accesos}
                        keyExtractor={(item,index) =>String(index)}
                        renderItem={({item}) => <TouchableOpacity style={{marginBottom:10, flexDirection:'row',justifyContent:'space-between'}} onPress={ () => console.log('pushaste')}>                                                                
                                                    <Text style={styles.textList}>{item.login}</Text>
                                                    <AntDesign name="delete" size={24} color="#3F3DE0" onPress={() => borrarAcceso(item.login)}/>                      
                                                </TouchableOpacity>
                                            }                              
                    />
                </View>

            </View>
        </ImageBackground>
    )
    
}

const styles = StyleSheet.create({
    text:{
        color:Interface.colorText,
        marginTop:10,
        textAlign:'center',
        fontSize:20,
        fontWeight:"bold",
    },
    textList:{
        color:Interface.colorText,
        marginTop:10,
        textAlign:'left',
        fontSize:15,
        fontWeight:"bold",
    }
})

export default accesosScreen