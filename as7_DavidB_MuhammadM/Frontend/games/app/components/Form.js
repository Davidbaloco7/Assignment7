/*
"StAuth10244: We, David Baloco Alvarez 000954494 and Muhammad Mehmood 000944148 certify that this material is our original work. 
No other person's work has been used without due acknowledgement. 
we have not made our work available to anyone else."
*/

import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';

export default function Form({update }) {

  const [game_Name, setGameName] = useState('');
  const [publisher, setPublisher] = useState('');
  const [developer, setdeveloper] = useState('');
  const [score, setScore] = useState(0);
  const [game, setGame] = useState({});
  const [id, setId] = useState(0);
  const [isUpdate, setUpdate] = useState(false);



  async function addData() {
    let game = {
      game_name: game_Name,
      publisher: publisher,
      developer: developer,
      score: score,
    };
    setGame(game);
    const rawResponse = await fetch('http://localhost:3001/api/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    const content = await rawResponse.json();
    console.log(content.status);
    update();
  }

   async function updateElement() {
    let game = {
      game_name: game_Name,
      publisher: publisher,
      developer: developer,
      score: score,
    };
    setGame(game);

    const rawResponse = await fetch('http://localhost:3001/api/'+id, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game)
    });
    const content = await rawResponse.json();
    console.log(content.status)
    update();
  }


  function parceInt(text) {
    let number = parseInt(text);
    if (isNaN(number)) {
      setScore(0);
    } else if (number > 100) {
      setScore(100);
    } else {
      setScore(number);
    }
  }


  return (
    
    <View style={styles.form}>

      <Button
        title="Update Mode"
        onPress={() => {
          setUpdate(!isUpdate);
        }}></Button>

      <View style={isUpdate ? null : styles.none}>
        <Text> ID (Just for update) </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setId(text);
          }}
          value={id}
        />
      </View>
      <View>
        <Text> Game name </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setGameName(text);
          }}
          value={game_Name}
        />
      </View>
      <View>
        <Text> Publisher </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPublisher(text);
          }}
          value={publisher}
        />
      </View>
      <View>
        <Text> Developer</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setdeveloper(text);
          }}
          value={developer}
        />
      </View>
      <View>
        <Text> Score(1-100) </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            parceInt(text);
          }}
          value={score}
        />
      </View>
      <Button
        title={isUpdate ? "Update Data" : "Save into DataBase"}
        onPress={isUpdate ? () => {
            updateElement();
        } : () => {
          addData();
        }}></Button>

    </View>
  );
}



export function FormD({update}) {
  const [id, setId] = useState(0);

  async function deleteElement(){
    const response = await fetch('http://localhost:3001/api/'+id,{
      method:'DELETE'
    });
    const content = await response.json();
    console.log(content.status)
    update();
} 


  function parceInt(text) {
    let number = parseInt(text);
    if (isNaN(number)) {
      setId(0);
    } else {
      setId(number);
    }
  }

  return (
    <View style={styles.form}>
      <View>
        <Text> Game ID to delete </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            parceInt(text);
          }}
          value={id}
        />
      </View>
      <Button
        title="Delete"
        onPress={() => {
          deleteElement();
        }}></Button>
    </View>
  );
}

export function FormG({TableAction}) {
 const [id, setId] = useState(0);

 async function loadelement(){
    const response = await fetch('http://localhost:3001/api/'+id);
    if (!response.ok) {
       console.log("ERROR getting the elements")
    }
    else{
       const info = await response.json();
       let newList = info;
       TableAction(newList);
    }
 } 

  function parceInt(text) {
    let number = parseInt(text);
    if (isNaN(number)) {
      setId(0);
    } else {
      setId(number);
    }
  }

  return (
    <View style={styles.form}>
      <View>
        <Text> Load element base on Id </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            parceInt(text);
          }}
          value={id}
        />
      </View>
      <Button
        title="Load element"
        onPress={() => {
          loadelement();
        }}></Button>
    </View>
  );
}


const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  none:{
    display: 'none',
  }
});