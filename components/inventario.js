import React, {useEffect} from 'react'


useEffect(() => {
    const fetchInventario = async () => {       
      const response = await fetch('https://cors-anywhere.herokuapp.com/' +'https://mysilver.webcindario.com/Tiendas/SMinventario.json')   
      const data = await response.json()       
      let simpleData =''        
      
      
      //el objeto que traigo con fetch tiene muchas ramas, lo hago mas corto con este codigo
      for (let index = 0; index < data.FDBS.Manager.TableList[0].RowList.length; index++) {
        simpleData = [data.FDBS.Manager.TableList[0].RowList[index].Original,...simpleData]
      } 

      
      setDataInventario(simpleData)                      
    }
    fetchInventario()
  },[]) 

  function inventario () {

  }

  export default inventario