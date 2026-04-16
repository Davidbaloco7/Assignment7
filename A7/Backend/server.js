/*
"StAuth10244: I David Baloco Alvarez, 000954494 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else."
*/

import express, { response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(express.json());
app.use(cors());


var file = "mydatabase.db" ;
var db = new sqlite3.Database(file);
let v = [];
db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS Games (id INTEGER PRIMARY KEY, game_name TEXT, publisher TEXT, developer TEXT, score INTEGER)");
});
 
db.close();


const server = app.listen(3001 , async function(){
    console.log("DONE");
}) 


async function getData(req,res){
    let id = req.params.id;
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });
    const result =  await db.all('SELECT * FROM Games WHERE id = ?',id );
    res.json(result);
    db.close;
} 

async function getALLData(req,res){
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });

    const result =  await db.all('SELECT * FROM Games ');
    res.json(result);
    db.close;
} 

async function saveData(req,res){
    let val = req.body[0];
    console.log(val);
    let id = req.params.id;
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });
    let an =  await db.run('UPDATE Games SET  game_name = ?, publisher = ?, developer = ? , score = ? WHERE id = ?',
        [val.gameName, val.publisher,val.developer,val.score, id]
    );
    db.close;
    if(an.changes > 0){
        res.json({status:"UPDATE DONE"})
    }
    else{
        res.json({status:"UPDATE ERROR"})
    }
}

async function saveAllData(req,res){
    let val = req.body;
    console.log(val);
    let id = req.params.id;
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });

    await db.run('DROP TABLE Games');
    await db.run("CREATE TABLE IF NOT EXISTS Games (id INTEGER PRIMARY KEY, game_name TEXT, publisher TEXT, developer TEXT, score INTEGER)");
    for(let key in val){
        let content = val[key];
        let an =  await db.run('INSERT INTO Games (game_name, publisher,developer,score) VALUES (?,?,?,?)',
        [content.gameName, content.publisher,content.developer,content.score]
     );
     console.log(an);
    }
    db.close;

    res.json({status:"REPLACE DONE"})
}

async function deleteData(req,res){
    let id = req.params.id;
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });
    let an =  await db.run('DELETE FROM Games WHERE id = ?;',
        [id]
    );
    db.close;
    if(an.changes > 0){
        res.json({status:"DELETE DONE"})
    }
    else{
        res.json({status:"DELETE ERROR"})
    }
}

async function deleteALLData(req,res){
    let id = req.params.id;
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });
    let an =  await db.run('DELETE FROM Games ',
        [id]
    );
    db.close;
    if(an.changes > 0){
        res.json({status:"DELETE DONE"})
    }
    else{
        res.json({status:"DELETE ERROR"})
    }
}

async function addData(req,res){
    let val = req.body[0];
    console.log(val);
    const db = await open({
                filename: 'mydatabase.db',
                driver: sqlite3.Database
                });
    let an =  await db.run('INSERT INTO Games (game_name, publisher,developer,score) VALUES (?,?,?,?)',
        [val.gameName, val.publisher,val.developer,val.score]
     );
    db.close;

    if(an.changes > 0){
        res.json({status:"ADD DONE"})
    }
    else{
        res.json({status:"ADD ERROR"})
    }
}

app.put('/api/:id',[saveData])

app.put('/api/',[saveAllData])

app.delete('/api/:id',[deleteData])
app.delete('/api/',[deleteALLData])

app.get('/api/:id', [getData]);

app.get('/api/', [getALLData]);

app.post('/api/', [addData]);





