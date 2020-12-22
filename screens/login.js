import React, {useState} from 'react'
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from 'react-native'
import * as Interface from '../components/interface'
import buscar from '../components/buscarUsuario'

const fondo = require('../assets/fondo.png')

function LoginScreen ({name,accion}) {    
    const [usuario, setUsuario] = useState('')

    const handleText = (data) => {
        let text = ''
        text= data
        setUsuario(text.toUpperCase())        
    }    
    
    return(
        <View style = {{flex:1}}>
            <ImageBackground source={fondo} style = {styles.container}>
                <View style={styles.container2}>
                    <Text style= {styles.text}> INICIAR SESION  </Text>
                    <TextInput secureTextEntry={true} onChangeText={data => handleText(data)} placeholder='Contraseña' style={[styles.input,styles.text]}/>
                    <TouchableOpacity  onPress={ () => accion(buscar(usuario))}>
                        <Text style={[Interface.boton,{marginTop:5,width:"100%"}]}>Aceptar</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={{marginTop:10}} onPress={() => console.log('haaa keres crear uno')}>
                        <Text>Nuevo usuario</Text>
                    </TouchableOpacity>
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
        padding:8, 
        textAlign:'center',
        height:250,   
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