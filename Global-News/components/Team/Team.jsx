import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Nombre', 'Apellido', 'Email','Cargo', 'Online'],
      tableData: [
      ['Mariano', 'Imhoff', 'imhmariano@gmail.com','User','Si'],
      ['Solomeo', 'Paredes', 'solomeo.p@gmail.com','User', 'No'],
      ['Armando', 'Casas', 'armando.c@gmail.com','User', 'No'],
      ['Elba', 'Tracio', 'elba.t@gmail.com','User', 'Si']]
    }
  }

  render() {
    const state = this.state;
    return (
      
      
      <View style={styles.container}>
        <Table borderStyle={styles.border}>
          <Row data={state.tableHead} style={styles.head} textStyle={{color:'#fff', fontSize:15}}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
      
      
    )
  }
}

const styles = StyleSheet.create({
  border:{borderWidth: 2, borderColor: '#0073b7'},
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, textAlign: 'center', backgroundColor:'#0073b7'},
  text: { margin: 10,textAlign: 'center', fontSize:10 },
  

});

