import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function CreateButton ( {handlePress, title} )
{
    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={{fontSize: 20}}>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})