/*
"StAuth10244: We, David Baloco Alvarez 000954494 and Muhammad Mehmood 000944148 certify that this material is our original work. 
No other person's work has been used without due acknowledgement. 
we have not made our work available to anyone else."
*/

import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default function ExampleOne ({info}) {
    let tableInfo = {
      tableHead: ['ID','Game Name', 'Publisher', 'Developer', 'Score'],
      tableData: []
    }
    info ? loadData(info,tableInfo.tableData) : "" 
    function loadData(info,array){
      for(let key in info){
          let game = info[key];
          let content = [game.id,game.game_name,game.publisher,game.developer, game.score];
          array.push(content);
        }
    }
    const state = tableInfo;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table> 
      </View>
    )
  }


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', margin: 10 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});