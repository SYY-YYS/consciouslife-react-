import { useContext, useEffect } from "react";
import { TodoContext } from "./TodoContext";

import SwipeableTemporaryDrawer from './SwipeableDrawer.js';
import { convertTime } from "./home.js";

export default function DoneToday(){

    const [todolist,setTodolist,,,,,,,isLogin] = useContext(TodoContext)

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
        
    },[])

    return(
        <>
        <SwipeableTemporaryDrawer />
        <h1>
            Done Today:
        </h1>
        <div className="dones">
            {todolist !== undefined &&
                todolist.map((obj) => {
                    console.log("obj " + obj)
                    if (obj.isUploaded) {
                        return <div key={obj.todo} className='done'>
                        {obj.todo + ' : ' + convertTime(obj.accumulatedTime)}
                        </div>
                    }             

            })}
        </div>
        </>
    );
}