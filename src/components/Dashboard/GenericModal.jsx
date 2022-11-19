import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import remove from "../../../assets/remove-icon.png"

export default function GenericModal( { form, modal, closeModal, handleModal } )
{
    const [formData, setFormData] = useState({})

    useEffect (( ) => {
        if( modal && modal.type === "editForm" )
        {
            for(let i = 0; i < form.length; i++)
            {
                setFormData(prevData => ({...prevData, [form[ i ].key] : form[ i ].value }))
            }
        }
    },[ ] ) 

    function handleSubmit( )
    {
        if(modal.type === "form" || modal.type === "editForm")
        {
            handleModal( formData )
        }
    }

    return (
        <View style={styles.container_background}>
            <View onPress={(e) => e.stopPropagation() } style={styles.modal}>
                <TouchableOpacity onPress={closeModal} style={styles.close_button}>
                    <Image style={styles.button_icon} source={remove} />
                </TouchableOpacity>
                <Text style={styles.title}>{modal.title ?? ""}</Text>
                {
                    form && form.map( input => (
                        <View key={ input.key } style={{marginBottom: 6}}>
                            <Text style={styles.label}>{input.key}</Text>
                            <TextInput
                            style={styles.input}
                            name={input.key}
                            placeholder={ input.placeholder }
                            type={input.type}
                            value={ formData[input.key] ?? ''}
                            onChangeText={(text) => setFormData(prevData => ({...prevData, [input.key]: text }))}
                            required
                            />
                        </View>
                    ))
                }
                <View style={{alignItems: "center", marginTop: 20}}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={{fontSize: 20}}>{ modal.confirm ?? "Create/Update" }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container_background : {
        position: "absolute", 
        backgroundColor: "#00000070", 
        height: "100%", 
        width: "100%", 
        zIndex: 60
    },
    modal : {
        zIndex: 80, 
        backgroundColor: "#ffffff", 
        width: "90%",
        maxWidth: 400, 
        height: "auto",
        padding: 30, 
        alignSelf: "center", 
        marginTop: 80,
        borderRadius: 16
    },
    title : {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    input : {
        width: "100%",
        borderRadius: 8,
        marginBottom: 8,
        padding: 8,
        backgroundColor: "#F5F5F5"
    },
    label : {
        fontSize: 18
    },
    button: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        paddingVertical: 20,
        borderRadius: 6,
        backgroundColor: "#37C9B6",
    },
    close_button : {
        right: 0,
        position: "absolute",
        transform: [
            { translateX: 10 },
            { translateY: -10}      
          ],
    },
    button_icon : {
        width: 32,
        height: 32
    },
})