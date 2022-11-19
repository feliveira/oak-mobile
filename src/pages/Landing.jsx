import { SafeAreaView, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"
import { useEffect } from "react";

export default function Landing ( { navigation } )
{

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Dashboard")
            }
        })
         
    }, [])

    return (
        <SafeAreaView style={styles.main_content}>
            <StatusBar />
            <Text style={styles.title}>Economia e Praticidade</Text>
            
            <Text style={styles.description}>Compare os melhores preços e realize o seu orçamento de forma efetiva!</Text>
            
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={[styles.button, styles.registerButton]}>
                <Text style={{fontSize: 20}}>Começar a economizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, styles.loginButton]}>
                <Text style={{fontSize: 20}}>Entrar</Text>
            </TouchableOpacity>

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
    title: {
        fontSize: 52,
        color: "#004441",
        width: "80%"
    },
    description : {
        marginHorizontal: 50,
        marginBottom: 60,
        fontSize: 18,
        color: "#777672",
        width: "80%"
    },
    button: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        paddingVertical: 20,
        borderRadius: 6,
    },
    registerButton : {
        backgroundColor: "#37C9B6",
    },
    loginButton: {
        backgroundColor: "#2a9d8f"
    }
})