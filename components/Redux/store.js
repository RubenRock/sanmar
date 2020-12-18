import {createStore} from 'redux'

const initialState = {
    inventario:[],
    empaque:[],
    similar:[],
    listasimilar:[]
}



const reducer = (state = initialState, action) =>{      
    if(action.type === "DESCARGAR_INVENTARIO"){   
      return{
          ...state,
          inventario: 'entraste a inventario',        
      }
    }

    if(action.type === "PONER_INVENTARIO"){    
      return{
        ...state,
        empaque: 'entraste a empaque',        
      }      
    }
          
    return state
}

export default createStore(reducer)