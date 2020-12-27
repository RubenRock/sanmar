import * as SQLITE from 'expo-sqlite'
const db = SQLITE.openDatabase("db.db");

const buscar =  password => new Promise((resolve, reject) =>{   
    let resul = []; 
    
    db.transaction(
        tx => {               
          tx.executeSql("select * from usuarios where password = ?", [password],  (tx, res) =>  {            
            let index = 0
            while (index < res.rows.length) {
              resul = [...resul,res.rows.item(index)]
              index++              
            }                                    
            if (resul.length)
                resolve(true)
            else
                resolve(false)
          })
        })       
})

export default buscar
