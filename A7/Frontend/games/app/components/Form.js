/*
"StAuth10244: I David Baloco Alvarez, 000954494 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else."
*/

import React, {useEffect, useState, useRef} from 'react';
import { Text, View, Button , StyleSheet, FlatList, TextInput} from 'react-native';


export default function Form({list, actionList}) {

  const[gameName, setGameName] = useState(""); 
  const[publisher, setPublisher] = useState(""); 
  const[developer, setdeveloper] = useState(""); 
  const[score, setScore] = useState(0); 

  function saveIntoList(){
    let game = {gameName:{gameName} , 
    publisher:{publisher} , 
    developer:{developer}, 
    score: {score}}
    let newList = [...list,game];
    actionList(newList);
  }

  async function addData () {
    const rawResponse = await fetch('http://localhost:3001/api/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list)
    });
    const content = await rawResponse.json();
    console.log(content.status)
}

  function parceInt(text){
    let number = parseInt(text);
    if(isNaN (number)){
      setScore(0);
    }
    else if (number > 100){
      setScore(100);
    }
    else{
      setScore(number);
    }
  }

  return (
    <View style={styles.form}>
      <View>
        <Text> Game name </Text>
        <TextInput style={styles.input}
        onChangeText={(text)=>{setGameName(text)}}
        value={gameName}
        />
      </View>  
      <View>
        <Text> Publisher </Text>
        <TextInput style={styles.input}
        onChangeText={(text)=>{setPublisher(text)}}
        value={publisher}
        />
      </View>  
      <View>
        <Text> Developer</Text>
        <TextInput style={styles.input}
        onChangeText={(text)=>{setdeveloper(text)}}
        value={developer}
        />
      </View>  
       <View>
        <Text> Score(1-100) </Text>
        <TextInput style={styles.input}
        onChangeText={(text)=>{parceInt(text)}}
        value={score}
        />
      </View>  
        <Button title="Save into List" onPress={()=>{saveIntoList()}}></Button>
        <Button title="Save into DataBase" onPress={()=>{addData()}}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form:{
    flexDirection: "column",
    margin:10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    padding:10,
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
});