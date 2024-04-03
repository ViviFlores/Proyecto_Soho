import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {StyleSheet, View } from 'react-native'
import { Avatar, IconButton, Modal, Portal, Text } from 'react-native-paper'
import { auth } from '../configs/firebaseConfig'

//creamos una interface para poder trabajar con el nombre del usuario logueado
interface UserData{
    name: string
}

export const HomePage = () => {

    //Hook useSate para el modal
    const [showModal, setShowModal] = useState(true)

    //Creamos un hook para poder trabajar con el nombre dle usuario
    const [userData, setUserData] = useState <UserData> ({
        name: ""
    })

    //Creamos un hook useEffect para capturar la data del usuario logueado
    // y asi mostramos en la ventana de home
    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if (user){
                setUserData({name:user.displayName ?? "NA"})
            }
        })
    }, [])

  return (
    <>
    <View style={styles.content}>
        <View style={styles.headerContent}>
            <Avatar.Text label='VF' size={50}/>
            <View>
                <Text variant='bodySmall'>Bienvenido</Text>
                <Text variant='labelLarge'>{userData.name}</Text>
            </View>
            <View style={styles.iconProfile}>
                <IconButton onPress={()=>{}} mode="contained" icon={"cog"} size={30}/>
            </View>
        </View>
    </View>
    <Portal>
        <Modal visible={showModal} contentContainerStyle={styles.modalProfile}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
    </Portal>
    </>

  )
}

const styles=StyleSheet.create({
    content:{
        flex: 1,
        marginVertical:50,
        marginHorizontal:20
    },
    headerContent:{
        flexDirection:"row",
        gap:15,
        alignItems:"center"
    },
    iconProfile:{
        alignItems:"flex-end", 
        flex:1
    },
    modalProfile:{
        paddingHorizontal:20
    }
})
