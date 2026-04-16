
/*
"StAuth10244: I David Baloco Alvarez, 000954494 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else."
*/

import React, {useEffect, useState,useRef} from 'react';
import { Text, View, Button , StyleSheet, FlatList, TextInput} from 'react-native';
import Form from './components/Form';



export default function RootLayout() {

const [list,setList] = useState([{gameName:"Mario 2" , publisher:"Nintendo" , developer:"Nintendo", score: 77} ,
    {gameName:"RE1" , publisher:"Campcon" , developer:"Campcon", score: 87}
  ]);


async function deleteElement(){
    const response = await fetch('http://localhost:3001/api/1',{
      method:'DELETE'
    });
    const content = await response.json();
    console.log(content.status)
  } 

async function deleteALLElements(){
    const response = await fetch('http://localhost:3001/api/',{
      method:'DELETE'
    });
    const content = await response.json();
    console.log(content.status)
  } 


async function saveData () {
    const rawResponse = await fetch('http://localhost:3001/api/1', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list)
    });
    const content = await rawResponse.json();
    console.log(content.status)
}
async function saveALLData () {
    const rawResponse = await fetch('http://localhost:3001/api/', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list)
    });
    const content = await rawResponse.json();
    console.log(content.status)
}
async function addData () {
    const rawResponse = await fetch('http://localhost:3001/api/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{gameName:"Zelda" , publisher:"Nintendo" , developer:"Nintendo", score: 100 }])
    });
    const content = await rawResponse.json();
    console.log(content.status)
}


  return (
    <View>
    <Form list={list} actionList={setList}> </Form>
    </View>
  );
}


const styles = StyleSheet.create({

});