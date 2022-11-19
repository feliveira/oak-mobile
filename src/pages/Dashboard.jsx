import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native"
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Navbar from "../components/Dashboard/Navbar"
import CreateButton from "../components/Dashboard/CreateButton";
import ProductItem from "../components/Dashboard/ProductItem";
import ShopItem from "../components/Dashboard/ShopItem";
import { useEffect, useState } from "react";
import axios from "axios";
import GenericModal from "../components/Dashboard/GenericModal";
 
export default function Dashboard( { navigation } )
{
    const [items, setItems] = useState([])
    const [tab, setTab] = useState("produtos")
    const [modalState, setModalState] = useState({
        createProduct: false, editProduct: false, createShop: false, editShop: false
    })
    const [itemToEdit, setItemToEdit] = useState({})

    useEffect(( ) => {
      
        setItems([])
        const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/${tab}`)
  
        async function fetchData(  )
        {
          const response = await axios.get( url )
          const result = await response.data
          setItems( prevItems => result )
        }
        
        fetchData( )
  
      }, [tab, modalState] )

    function handleLogout ( ) {
        signOut(auth).then(() => {
        // Sign-out successful.
            navigation.navigate("Landing");
        }).catch((error) => {
        // An error happened.
        });
    }

    function handleModal ( type, item )
    {
      
      setItemToEdit( item )

      if( type === "editShop" )
      {
        setModalState(prevState => ({...prevState, editShop: true}))
      }
      if ( type === "editProduct" )
      {
        setModalState(prevState => ({...prevState, editProduct: true}))
      }
    }

    function createProduct ( product )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/produtos`)
      axios.post( url, {...product, valor: parseFloat(product.valor)}, {mode : "no-cors" } )
      .then(response => {
        setModalState(prevState => ({...prevState, createProduct: false}))
      }
      )
      .catch(error => console.log(error))
    }

    function editProduct ( product )
    {

      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/produtos/${ itemToEdit.id }`)
      axios.put( url, product )
      .then(response => {
        setModalState(prevState => ({...prevState, editProduct: false}))
      }
      )
      .catch(error => console.log(error))
    }

    function deleteProduct( id )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/produtos/${id}`)
      axios.delete( url )
      .catch(error => console.log(error))
    }

    function createShop ( shop )
    {
        const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/lojas`)
        axios.post( url, {...shop}, {mode : "no-cors" } )
        .then(response => {
          setModalState(prevState => ({...prevState, createProduct: false}))
        }
        )
        .catch(error => console.log(error))
    }

    function deleteShop( id )
    {
      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/lojas/${id}`)
      axios.delete( url )
      .catch(error => console.log(error))
    }

    function editShop ( shop )
    {

      const url = "https://corsproxy.io/?" + encodeURIComponent(`https://oakdental.herokuapp.com/lojas/${ itemToEdit.id }`)
      axios.post( url, shop, {method: "PUT" } )
      .then(response => {
        setModalState(prevState => ({...prevState, editShop: false}))
      }
      )
      .catch(error => console.log(error))
    }


    return (
        <ScrollView>
            <Navbar handleLogout={handleLogout} />
            
           { modalState.createProduct && 
            <GenericModal 
                modal={{type: "form", title: "Criar Produto", confirm: "Criar"}}
                form={
                [
                {placeholder: "Nome do Produto", key: 'nome'},
                {placeholder: "Descrição do Produto", key: 'descricao'},
                {placeholder: "Marca do Produto", key: 'marca'},
                {placeholder: "Valor do Produto", key: 'valor'},            
                ]}
                handleModal={createProduct}
                closeModal={ ( ) => setModalState(prevState => ({...prevState, createProduct: false}))}
            /> }

            { modalState.editProduct && 
                <GenericModal
                modal={{type: "editForm", title: "Editar Produto", confirm: "Editar"}}
                form={
                [
                    {placeholder: "Nome do Produto", key: 'nome', value: itemToEdit.nome},
                    {placeholder: "Descrição do Produto", key: 'descricao', value: itemToEdit.descricao},
                    {placeholder: "Marca do Produto", key: 'marca', value: itemToEdit.marca},
                    {placeholder: "Valor do Produto", key: 'valor', value: itemToEdit.valor},            
                ]}
                handleModal={editProduct}
                closeModal={ ( ) => setModalState(prevState => ({...prevState, editProduct: false}))}
            /> }

            { modalState.createShop && 
            <GenericModal
              modal={{type: "form", title: "Criar Loja", confirm: "Criar"}}
              form={
              [
                {placeholder: "Nome do Produto", key: 'nome'},
                {placeholder: "Link do Website", key: 'path'},        
              ]}
              handleModal={createShop}
              closeModal={ ( ) => setModalState(prevState => ({...prevState, createShop: false}))}
            /> }

            { modalState.editShop && 
            <GenericModal
              modal={{type: "editForm", title: "Editar Loja", confirm: "Editar"}}
              form={
              [
                {placeholder: "Nome da Loja", key: 'nome', value: itemToEdit.nome},
                {placeholder: "Link do Website", key: 'path', value: itemToEdit.path}         
              ]}
              handleModal={editShop}
              closeModal={ ( ) => setModalState(prevState => ({...prevState, editShop: false}))}
            /> }

            <View style={{alignItems: "center", marginVertical: 16}}>
                <CreateButton handlePress={() => setModalState(prevState => ({...prevState, createShop: true}))} title="Criar Loja" />
                <CreateButton handlePress={() => setModalState(prevState => ({...prevState, createProduct: true}))} title="Criar Produto" />
            </View>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: 30}}>
                <TouchableOpacity onPress={() => setTab("lojas")}>
                    <Text style={{fontSize: 20, marginRight: 20}}>Lojas</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 30}}>|</Text>
                <TouchableOpacity onPress={() => setTab("produtos")}>
                    <Text style={{fontSize: 20, marginLeft: 20}}>Produtos</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: "center", marginTop: 20}}>
                {
                  items.length && tab == "produtos" ?
                      items.map(item => (
                      <ProductItem key={item.id} {...item} handleModal={handleModal} handleDelete={deleteProduct} />
                      ))
                  : ""
                }
                {
                  items.length && tab == "lojas" ?
                    items.map(item => (
                      <ShopItem key={item.id} {...item} handleModal={handleModal} handleDelete={deleteShop} />
                    ))
                  : ""
                }
            </View>

        </ScrollView>
    )
}