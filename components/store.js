import {createStore} from 'redux'
import * as SQLITE from 'expo-sqlite'

const db = SQLITE.openDatabase("db.db");

const initialState = {
    inventario:[],
    empaque:[],
    similar:[],
    listasimilar:[]
}

const reducerDescargas = (state = initialState, action) =>{  
        let resul = [];
        db.transaction(
            tx => {               
              tx.executeSql("select * from inventario", [],  (tx, res) =>  {            
               
                let index = 0;
                while (index < res.rows.length) {
                  resul = [...resul,res.rows.item(index)]
                  index++              
                }                            
                console.log(resul)
              })
            })
            
            console.log(resul)  
        return{
            ...state,
            inventario: resul
        }
    
    
    
}

export default createStore(reducerDescargas)