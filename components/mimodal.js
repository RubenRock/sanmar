import React from 'react'
import {View, Text, Modal, StyleSheet} from 'react-native'
import { ProgressBar, Colors } from 'react-native-paper'



export default function MiModal({visible, children, progress, title}){
    return(
        <Modal           
        style={{flex:1}}
        animationType= 'slide'
        transparent={true}
        visible={visible}
        >
            <View style={styles.container}>                
                <View style={styles.container2}>
                    <Text style={styles.text}>{title}</Text> 
                    <View style={{width:'100%',alignItems:"center",marginTop:30}}>
                        <ProgressBar style={{width:300,height:10, borderRadius:50}} progress={progress} color={'#3F3DE0'} visible={true}/>
                    </View>
                  
                    {children}
                </View>
            </View>
        </Modal>
          
      
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.3) ',
    },
    container2:{
        width:'90%',
        padding:30,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        margin:10,
    },
    text: {       
        color:"#3F3DE0",
        fontWeight:'bold' 
      }

    
})
