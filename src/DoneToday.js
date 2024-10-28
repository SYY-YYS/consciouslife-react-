import { useContext, useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";

import SwipeableTemporaryDrawer from './SwipeableDrawer.js';
import { convertTime } from "./home.js";

import axios from 'axios';
import { transformData } from "./DataAnalyze.js";

export default function DoneToday(){

    const [todolist,setTodolist,,,,,,,isLogin,,sevenday,setSevenday, itemstodate, setItemtodate] = useContext(TodoContext)

    const [doneComponent, setDoneComponent] = useState(<></>)
    // switching page wont render concated list
    useEffect(()=>{
        // concat todolist
        let Ltodolist = JSON.parse(localStorage.getItem('todolist'))
        // console.log(Ltodolist,typeof(Ltodolist))

        if (Ltodolist) {
            let concatlist = Object.values(Ltodolist.reduce((acc, obj) => {
            if (!acc[obj.todo]) {
                acc[obj.todo] = {
                    todo: obj.todo,
                    startTime: obj.startTime, // You can choose how to handle startTime
                    accumulatedTime: 0,
                    isUploaded: obj.isUploaded
                };
            }
            acc[obj.todo].accumulatedTime += obj.accumulatedTime; // Sum the accumulatedTime
            return acc;
        }, {}));
            console.log(concatlist)
            localStorage.setItem("todolist", JSON.stringify(concatlist))
            setTodolist(concatlist)
        }

        axios.get(process.env.REACT_APP_Backend_Url + '/7days', 
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
        ).then((res) => {
            console.log(res.status, res.data)
            console.log(transformData(res.data, 7))
            // saving the data in localstorage as "7days"
            localStorage.setItem("itemtodate", JSON.stringify(res.data))
            localStorage.setItem("7days", JSON.stringify(transformData(res.data, 7)))
            setItemtodate(res.data)
            setSevenday(transformData(res.data, 7))
        }).catch((err) =>{
            console.log(err)
            // show previous loaded if cant load
            let sevenD = localStorage.getItem("7days")
            let itemD = localStorage.getItem("itemtodate")
            if (sevenD) {
              setSevenday(JSON.parse(sevenD))
              setItemtodate(JSON.parse(itemD))
            }
        })

        console.log(new Date().toJSON().slice(0,10))
        
    },[])
    

    return(
        <>
        <SwipeableTemporaryDrawer />
        <h1>
            Done Today:
        </h1>
        <div className="dones">
            {sevenday !== undefined && 
                sevenday.map((obj) => {
                    // console.log(obj.name, obj.name === new Date().toJSON().slice(0,10))
                    if (obj.name === new Date().toJSON().slice(0,10)) {
                        for (let key in obj) {
                            if (key !== "name") {
                                console.log(key+ " : " + obj[key])
                                return <div key={key} className='done'>{key + " : " + obj[key]}</div>
                            }
                        }
                    }
                })
            }
            {/* {todolist !== undefined &&
                todolist.map((obj) => {
                    console.log("obj " + obj)
                    if (obj.isUploaded) {
                        return <div key={obj.todo} className='done'>
                        {obj.todo + ' : ' + convertTime(obj.accumulatedTime)}
                        </div>
                    }             

            })} */}
        </div>
        </>
    );
}