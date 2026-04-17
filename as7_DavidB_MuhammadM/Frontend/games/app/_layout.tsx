
/*
"StAuth10244: We, David Baloco Alvarez 000954494 and Muhammad Mehmood 000944148 certify that this material is our original work. 
No other person's work has been used without due acknowledgement. 
we have not made our work available to anyone else."
*/

import React, {useEffect, useState,useRef,} from 'react';
import { Text, View, Button , StyleSheet, FlatList, TextInput} from 'react-native';
import Form from './components/Form';
import {FormD, FormG} from './components/Form';
import Table from './components/Table';




export default function RootLayout() {
  //{id: 2,game_name:"RE1" , publisher:"Campcon" , developer:"Campcon", score: 87}

const [list,setList] = useState([]);


useEffect(() => {
  loadAllelement();
},[]);

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

 async function loadAllelement(){
    const response = await fetch('http://localhost:3001/api/');
    if (!response.ok) {
       console.log("ERROR getting the elements")
    }
    else{
       const info = await response.json();
       let newList = [];
        for(let key in info){
          newList.push(info[key]);
        }
        setList(newList);
    }
} 




  return (
    <View>
      <Table info={list}/> 
      <Button title='Delete DataBase Info'
      onPress={() => {
        deleteALLElements();
        loadAllelement();
      }}></Button>

      <Button title='Load elements'
      onPress={() => {
        loadAllelement();
      }}></Button>
      <FormG TableAction={setList}> </FormG>
      <FormD update={loadAllelement}> </FormD>
      <Form update={loadAllelement} > </Form>
    </View>
  );
}


const styles = StyleSheet.create({
});