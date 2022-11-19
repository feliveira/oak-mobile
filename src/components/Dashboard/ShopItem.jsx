import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import remove from "../../../assets/remove-icon.png"
import edit from "../../../assets/edit-icon.png"

export default function ProductItem( { id, nome, path, produtos, handleDelete, handleModal } )
{
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleDelete( id )} style={styles.delete_button}>
                <Image style={styles.button_icon} source={remove} />
            </TouchableOpacity>
            <Text style={styles.name}>{nome ? `${nome.substring(0,16)}...` : ''}</Text>
            <Text style={styles.pathLink}>{path ?? "" }</Text>
            <Text style={styles.products}>{ produtos ? `${produtos.length} produto${ produtos.length > 1 || produtos.length == 0 ? "s" : "" }` : ''}</Text>
            <TouchableOpacity onPress={( ) => handleModal( "editShop", { id: id , nome: nome, path: path } )} style={styles.edit_button}>
                <Image style={{width: 24, height: 24}} source={edit} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: "80%",
        height: 160,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
        padding: 20,
        marginVertical: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9
    },
    button_icon : {
        width: 32,
        height: 32
    },
    delete_button : {
        right: 0,
        position: "absolute",
        transform: [
            { translateX: 10 },
            { translateY: -10}      
          ],
    },
    edit_button : {
        right: 8,
        bottom: 8,
        position: "absolute",
    },
    name : {
        fontSize: 24
    },
    pathLink : {
        fontSize: 16
    },
    brand : {
        fontSize: 18
    },
    products : {
        fontSize: 20
    }
})