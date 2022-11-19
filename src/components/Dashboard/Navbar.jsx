import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import icon from "../../../assets/tooth-icon.png"

export default function Navbar({ handleLogout })
{

    return (
        <View style={styles.container}>
            <View style={{flexDirection : "row"}}>
                <Image source={icon} style={{width: 20, height: 20}} />
                <Text style={styles.brand}>oakdental.</Text>
            </View>
            <TouchableWithoutFeedback onPress={handleLogout}>
                <Text style={styles.logout}>Sair</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: "#F5F5F5", 
        alignItems: "center", 
        paddingVertical: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    brand: {
        color: "#004441", 
        fontSize: 16
    },
    logout:
    {
        color: "#004441",
        fontSize: 20,
        marginTop: 14
    }
})