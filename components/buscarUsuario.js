import React, { useState } from 'react'

import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db");

const buscar =  password =>{   
    let resul = []; 
    
    return( db.transaction(
        tx => {               
          tx.executeSql("select * from usuarios where password = ?", [password],  (tx, res) =>  {            
            let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }                        
            console.log(password)
            console.log(resul.length)
            if (resul.length)
                result(true)
            else
                result(false)
          })
        })   
    )
}

const result = (data) =>{
    return(data)
}



function buscarUsuario (password) {  
    buscar(password)
}


export default buscarUsuario