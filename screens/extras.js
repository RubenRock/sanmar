import React from 'react'
import {TouchableOpacity, Text, View, ImageBackground, StyleSheet} from 'react-native'
import * as SQLITE from 'expo-sqlite'
import * as Interface from '../components/interface'

const db = SQLITE.openDatabase("db.db");

const formatear = () =>{
    db.transaction(tx => {
        tx.executeSql("drop table articulos ",[],(e)=>console.log(e),()=>console.log("borrado articulos"));
        tx.executeSql("drop table inventario ",[],(e)=>console.log(e),()=>console.log("borrado inventario"));
        tx.executeSql("drop table lista_remision ",[],(e)=>console.log(e),()=>console.log("borrado lista_remision"));
        tx.executeSql("drop table remisiones ",[],(e)=>console.log(e),()=>console.log("borrado remisiones"));
        tx.executeSql("drop table empaques ",[],(e)=>console.log(e),()=>console.log("borrado empaques"));
        tx.executeSql("drop table listasimilar ",[],(e)=>console.log(e),()=>console.log("borrado listasimilar"));
        tx.executeSql("drop table similares ",[],(e)=>console.log(e),()=>console.log("borrado similares"));
        tx.executeSql("drop table usuarios ",[],(e)=>console.log(e),()=>console.log("borrado usuarios"));
        tx.executeSql("drop table accesos ",[],(e)=>console.log(e),()=>console.log("borrado accesos"));
      },(e) => alert(e),
      () => alert('Borrado con exito'));
    //db.exec
    
}

const crearTablas = () =>{
    db.transaction(tx => {
        tx.executeSql("create table if not exists inventario (clave text, producto text, iva text, usuario text, fecha date, ieps text)");
        tx.executeSql("create table if not exists empaques (clave text, empaque text, precio text, piezas integer, barras text, id text)");
        tx.executeSql("create table if not exists remisiones (folio integer, cantidad text, producto text, total text, tipo text, empaque text, descuento text, clave text, clave_empaque text)");
        tx.executeSql("create table if not exists lista_remision (folio integer, cliente text, total text, fecha text, vendedor text, condicion text, estado text, domicilio text, impresion text, descuento text)");
        tx.executeSql("create table if not exists listasimilar (clave integer, descripcion text)");
        tx.executeSql("create table if not exists similares (clave integer, producto text)");
        tx.executeSql("create table if not exists usuarios (login text, password text PRIMARY KEY)");
        tx.executeSql("create table if not exists accesos (login text, acceso text)");
        tx.executeSql("insert into usuarios (login, password) values (?, ?)", ['RUBEN', 'avla']);
        tx.executeSql("insert into accesos (login, acceso) values (?, ?)", ['RUBEN', 'ACTIVO']);
      },(e) => alert(e.message),
      () => alert('Tablas Creadas correctamente'));
}

function extrasScreen() {

    return(
        <ImageBackground source={Interface.fondo} style={{flex:1,justifyContent:"center"}}>
            <View style={Interface.container}>
                <Text style={styles.text}> Acciones de la base de datos</Text>
                
                <TouchableOpacity onPress={() =>crearTablas()}>
                    <Text style={[Interface.boton,{marginTop:50, width:"100%",}]}>Crear Tablas</Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={() =>formatear()}>
                    <Text style={[Interface.boton,{marginTop:50, width:"100%",}]}>Formatear</Text>
                </TouchableOpacity>                

            </View>
        </ImageBackground>
    )
    
}

const styles = StyleSheet.create({
    text:{
        color:Interface.colorText,
        marginTop:10,
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
    }
})

export default extrasScreen