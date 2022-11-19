import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import remove from "../../../assets/remove-icon.png"
import edit from "../../../assets/edit-icon.png"

export default function ProductItem( {id, nome, descricao, marca, valor, handleDelete, handleModal} )
{
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleDelete( id )} style={styles.delete_button}>
                <Image style={styles.button_icon} source={remove} />
            </TouchableOpacity>
            <Text style={styles.name}>{nome ? `${nome.substring(0,16)}...` : ''}</Text>
            <Text style={styles.description}>{descricao ? `${descricao.substring(0,20)}...` : ''}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.brand}>{marca ?? ''}</Text>
                <Text style={styles.price}>{ valor ? `R$${valor}` : ''}</Text>
            </View>
            <TouchableOpacity onPress={( ) => handleModal( "editProduct", { id: id , nome: nome, descricao: descricao, marca: marca, valor: valor } )} style={styles.edit_button}>
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

        elevation: 9,
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
    description : {
        fontSize: 16
    },
    brand : {
        fontSize: 18
    },
    price : {
        fontSize: 20
    }
})