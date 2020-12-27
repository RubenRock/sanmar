import React, {useState} from 'react'
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from 'react-native'
import * as Interface from '../components/interface'
import buscar from '../components/buscarUsuario'

import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db");

const fondo = require('../assets/fondo.png')

function LoginScreen ({name,accion}) {    
    const [password, setPassword] = useState('')
    const [newUsuario, setNewUsuario] = useState({'usuario':'','contraseña':'','repcontraseña':'' })
    const [newUserScreen, setNewUserScreen] = useState(false)


    const handleTextIniciarSesion = (data) => {        
        setPassword(data)        
    }   

    const handleUsuario = data =>{
        let text = ''
        text= data
        setNewUsuario({...newUsuario,'usuario':text.toUpperCase()}) 
    }

    const handleContraseña = data =>{
        setNewUsuario({...newUsuario,'contraseña':data})
    }
    
    const handleRepContraseña = data =>{
        setNewUsuario({...newUsuario,'repcontraseña':data})
    }

    const insertNewUser = data =>{
        if ((newUsuario.contraseña.trim() === newUsuario.repcontraseña.trim()) && (newUsuario.contraseña.trim()!=''))
        {
            db.transaction(
                tx => {                       
                    tx.executeSql("insert into usuarios (login, password) values (?, ?)", [newUsuario.usuario, newUsuario.contraseña])                                
                },
                (error)=> alert('No se creo el usuario: ' + error.message),
                () =>alert('Usuario creado correctamente')
            )
            
        }
        else    
            alert('contraseñas no son iguales')
    }
    
    return(
        <View style = {{flex:1}}>
            <ImageBackground source={fondo} style = {styles.container}>
                <View style={styles.container2}>
                    { newUserScreen ? 
                        <>                              
                            <Text style= {styles.text}> AGREGAR USUSARIO  </Text>
                            <TextInput onChangeText={(data) => handleUsuario(data)} value= {newUsuario.usuario} placeholder='nombre' style={[styles.input,styles.text]} />
                            <TextInput secureTextEntry={true} onChangeText={(data) => handleContraseña(data)} placeholder='contraseña' style={[styles.input,styles.text]}/>
                            <TextInput secureTextEntry={true} onChangeText={(data) => handleRepContraseña(data)} placeholder='repetir contraseña' style={[styles.input,styles.text]}/>
                            <TouchableOpacity  onPress={ () => insertNewUser()}>
                                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Aceptar</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity style={{marginTop:10}} onPress={() => setNewUserScreen(false)}>
                                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Regresar a inicio de sesion</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>                             
                            <Text style= {styles.text}> INICIAR SESION  </Text>
                            <TextInput secureTextEntry={true} onChangeText={data => handleTextIniciarSesion(data)} placeholder='Contraseña' style={[styles.input,styles.text]}/>
                            <TouchableOpacity  onPress={ () => buscar(password).then(resul => resul?  accion(resul) : alert('Usuario incorrecto'))}>
                                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Aceptar</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity style={{marginTop:10}} onPress={() => setNewUserScreen(true)}>
                                <Text>Nuevo usuario</Text>
                            </TouchableOpacity>                            
                        </>
                    }
                </View>
            </ImageBackground>
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    text:{        
        color:Interface.colorText,
        fontWeight:"bold",
        fontSize:20,
        },

    container2:{          
        alignSelf:'stretch',
        marginHorizontal:10,     
        backgroundColor:'rgba(4,119,224,0.2)',
        borderRadius:10,
        paddingHorizontal:10, 
        paddingVertical:20,
        textAlign:'center',
        //height:250,   
        justifyContent:'center',
        },

    input:{            
        marginTop:50,
        borderBottomWidth:2,
        borderColor:'white',
        marginBottom:10
    },
})

export default LoginScreen