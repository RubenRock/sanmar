import React, {useEffect} from 'react'
import {View} from 'react-native'
import { connect, useSelector  } from 'react-redux'


const Descargas = ({state,descargar,ponervalor}) =>{
    useEffect(() =>{
        descargar('tamales')
        ponervalor('orale')
    },[])
    
    //const inven = useSelector(state => console.log(state.inventario))
    

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
    descargar(x,y){
        dispatch({
            type:"DESCARGAR_INVENTARIO",
            x,y
        })
    },

    ponervalor(x){
        dispatch({
            type:"PONER_INVENTARIO",
            x
        })
    }

  })

  export default connect(mapStateToProps,mapDispatchToProps)(Descargas)