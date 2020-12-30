import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from 'react-native'
import * as Interface from '../components/interface'
import buscar from '../components/buscarUsuario'
import {useSelector, useDispatch} from 'react-redux'

import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db");

const fondo = require('../assets/fondo.png')

function LoginScreen ({accion}) {    
    const [password, setPassword] = useState('')
    const [newUsuario, setNewUsuario] = useState({'usuario':'','contraseña':'','repcontraseña':'' })
    const [newUserScreen, setNewUserScreen] = useState(false)
    
    const dispatch = useDispatch()
    const usuariosRedux = useSelector(state => state.usuarios)  

    //limpiamos cajas de texto al cambiar de login a crear usuarios
    useEffect(()=>{
        setPassword('')
        setNewUsuario({'usuario':'','contraseña':'','repcontraseña':'' })
    },[newUserScreen])


    const handleTextIniciarSesion = (data) => {        
        setPassword(data)        
    }   

    const handleUsuario = data =>{        
        setNewUsuario({...newUsuario,'usuario':data}) 
    }

    const handleContraseña = data =>{
        setNewUsuario({...newUsuario,'contraseña':data})
    }
    
    const handleRepContraseña = data =>{
        setNewUsuario({...newUsuario,'repcontraseña':data})
    }

    const newUsuarioExito = (usuario, contraseña)=>{
        alert('Usuario creado correctamente')
        dispatch({type:'AGREGAR_USUARIOS', data:{login:usuario,password:contraseña}})
        setNewUserScreen(false)
    }

    const insertNewUser = () =>{
        if ((newUsuario.contraseña.trim() === newUsuario.repcontraseña.trim()) && (newUsuario.contraseña.trim()!=''))
        {
            db.transaction(
                tx => {                       
                    tx.executeSql("insert into usuarios (login, password) values (?, ?)", [newUsuario.usuario.toUpperCase(), newUsuario.contraseña])                                
                },
                (error)=> alert('No se creo el usuario: ' + error.message),
                () =>newUsuarioExito(newUsuario.usuario, newUsuario.contraseña)
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
                            <TouchableOpacity  onPress={ () => insertNewUser() }>
                                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Aceptar</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity style={{marginTop:10}} onPress={() => setNewUserScreen(false)}>
                                <Text style={{marginTop:5,width:"100%",textAlign:'center',color:Interface.colorText}}>Regresar a inicio de sesion</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>                             
                            <Text style= {styles.text}> INICIAR SESION  </Text>
                            <TextInput secureTextEntry={true} onChangeText={data => handleTextIniciarSesion(data)} placeholder='Contraseña' style={[styles.input,styles.text]} value={password}/>
                            <TouchableOpacity  onPress={ () => { // en Redux guardo en user los datos del usuario que entro                                                                                                                        
                                                            let user = usuariosRedux.filter(x => x.password == password)                                                            
                                                            dispatch({type:'CARGAR_USER',data:user})
                                                            buscar(password).then(resul => resul?  accion(resul) : alert('Usuario incorrecto'))                                                            
                                                        }
                                                        }>
                                <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Aceptar</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity style={{marginTop:10}} onPress={() => setNewUserScreen(true)}>
                                <Text style={{textAlign:'center',color:Interface.colorText}}>Nuevo usuario</Text>
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
        textAlign:'center',
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