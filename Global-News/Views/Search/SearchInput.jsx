import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { searchUsersByName } from "../../store/user";
import { View } from "react-native-web";
import { onChange } from "react-native-reanimated";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const dispatch = useDispatch();
    const onChangeSearch = (query) => {
        setSearchQuery(query)
    }
  const handleSearch = () => dispatch(searchUsersByName(searchQuery));

  return (
    <View>
      <Searchbar
        style={styles.search}
        placeholder="Buscar Empleado"
        onChangeText={onChangeSearch}
      />
      <Button title='Buscar' onPress={()=> handleSearch()}/>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  search: {
    marginBottom: 5,
  },
});
