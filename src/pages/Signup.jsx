import { Text, SafeAreaView, StatusBar, StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image } from "react-native"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'
import { useState } from "react";
import icon from "../../assets/tooth-icon.png"

export default function Signup ( { navigation } )
{

    const [formData, setFormData] = useState({
        email: "", password: ""
    })

    const [error, setError] = useState({
        hasError: false, message: ""
    })

    function registerUser ( ) {
     
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigation.navigate('Login')
            // ...
        })
        .catch((error) => {
            setError(( ) => ( { hasError: true, message: error.message} ))
        });
    }

    return (
        <SafeAreaView style={styles.main_content}>
            <StatusBar />
            <View style={{flexDirection : "row"}}>
                <Image source={icon} style={{width: 20, height: 20}} />
                <Text style={styles.brand}>oakdental.</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                style={styles.input} 
                name="email" 
                value={formData.email} 
                onChangeText={(text) => setFormData(prevData => ({...prevData, email: text }))} />
                
                <Text style={styles.label}>Senha</Text>
                <TextInput 
                style={styles.input} 
                name="password" 
                value={formData.password} 
                onChangeText={(text) => setFormData(prevData => ({...prevData, password: text }))}  
                secureTextEntry />
                
                <View styles={{alignItems: "center"}}>
                    <TouchableOpacity onPress={registerUser} style={styles.confirm_button}>
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Text style={{fontSize: 16}}>Já tem uma conta?{" "}</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Login') }>
                    <Text style={{color: "#004441", fontSize: 16}}>Login</Text> 
                </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main_content : {
        backgroundColor: "#F8F7F2",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    brand : {
        color: "#004441",
        fontSize: 16
    },
    container : {
        backgroundColor: "#FFFFFF",
        padding: 30,
        borderRadius: 20,
        marginVertical: 20,
        width: "80%"
    },
    label : {
        fontSize: 18
    },
    input : {
        backgroundColor: "#F5F5F5",
        marginTop: 10,
        marginBottom: 20,
        padding: 6,
        borderRadius: 10
    },
    confirm_button : {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        paddingVertical: 20,
        borderRadius: 6,
        backgroundColor: "#37C9B6",
    }
})
