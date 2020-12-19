import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import { connect, useSelector  } from 'react-redux'

import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db");


const Descargas = ({state,descargar,ponervalor}) =>{
    const[dataInventario, setDataInventario] = useState([])
    const[dataEmpaque, setDataEmpaque] = useState([])
    

    useEffect(() =>{
        db.transaction(
            tx => {               
              tx.executeSql("select * from inventario", [],  (tx, res) =>  {            
                let resul = [];let index = 0;
                while (index < res.rows.length) {
                  resul = [...resul,res.rows.item(index)]
                  index++              
                }            
                setDataInventario(resul)                                  
              }),

              tx.executeSql("select * from empaques", [],  (tx, res) =>  {            
                let resul = [];let index = 0
                while (index < res.rows.length) {
                  resul = [...resul,res.rows.item(index)]
                  index++              
                }            
                setDataEmpaque(resul)                                  
              })
            })
            
    },[])

    useEffect(() => {
        ponervalor(dataEmpaque)
        descargar(dataInventario)
    },[dataEmpaque])
    
    //const inven = useSelector(state => console.log(state.inventario))
    
    //descargar(dataInventario)
   

    return(
        <View>
            {console.log(state)}        
        </View>
    )

}

const mapStateToProps = state => ({
    inventario: state.inventario,
    state: state
  })
  
  const mapDispatchToProps = dispatch => ({
    descargar(data){
        dispatch({
            type:"CARGAR_INVENTARIO",
            data
        })
    },

    ponervalor(data){
        dispatch({
            type:"CARGAR_EMPAQUE",
            data
        })
    }

  })

  export default connect(mapStateToProps,mapDispatchToProps)(Descargas)