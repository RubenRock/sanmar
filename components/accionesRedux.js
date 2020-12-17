import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'


const Descargas = ({inventario,descargar}) =>{
    useEffect(() =>{
        descargar()
    },[])
    
    return(
        <View>
            {console.log('inventario')}        
        </View>
    )

}

const mapStateToProps = state => ({
    inventario: state.inventario
  })
  
  const mapDispatchToProps = dispatch => ({
    descargar(x){
        dispatch({
            type:"DESCARGAR_INVENTARIO",
            x
        })
    }
  })

  export default connect(mapStateToProps,mapDispatchToProps)(Descargas)