import  React, {useState} from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, Button, View, Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SearchInput = ({dispatchInput, input}) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const users = useSelector((state) => state.user);
 
  
  

  const onChangeSearch = (query) => {
        setSearchQuery(query)
    }

  const handleSearch = () => {
    if(users.positionId === 1 || users.positionId === 2 || users.positionId === 3){
    dispatch(dispatchInput({searchQuery,input}))}
    else{dispatch(dispatchInput(searchQuery))}
  }

   

  return (
    <View>
      <Searchbar
        style={styles.search}
        placeholder="Buscar Empleado"
        onChangeText={onChangeSearch}
      />
      <Pressable style={styles.button} onPress={()=> handleSearch()}>
        <Text style={styles.text}>Buscar</Text>
      </Pressable>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  search: {
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    marginBotton: 10,
    backgroundColor: "#0073b7",
    borderColor: "white",
    borderRadius: 30,
    width: '100%',
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

});
