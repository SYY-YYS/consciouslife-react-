import * as React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { useContext, useEffect } from 'react';
import  { TodoContext } from './TodoContext';

export default function FixedContainer({timer, setStartDoing}) {

    const [todolist,setTodolist,,,,,todo] = useContext(TodoContext);

    function discard(){
        setTodolist(prev => {
            prev = prev.map((obj) => {
                if (!obj.Done) {
                    obj.Done = true;
                }
                return obj;
            })
            return prev;
        })
        let Ltodolist = JSON.parse(localStorage.getItem("todolist"));
        Ltodolist = Ltodolist.map((obj) => {
            if (!obj.Done) {
                obj.Done = true;
            }
            return obj;
        })
        localStorage.setItem("todolist", JSON.stringify(Ltodolist))
        setStartDoing(false)
    }
    
    // useEffect(()=>{
    //     // add todolist to localstorage (wont disappear when refresh) 
    //     // not working (only update when submit is clicked)
    //     console.log(todolist)
    //     localStorage.setItem("todolist", JSON.stringify(todolist))
    // },[])

    function stopTime(){
        // time in second
        let timeUsed = ((new Date().getTime() - timer)/1000).toFixed(0);
        

        // learnt: hv to return sth for not edited ones and return the exact obj in map
        setTodolist(prevState => {
            let changed = false;
            
            let newState = prevState.map(obj => {
                if (obj.todo === todo && !obj.isUploaded) {
                    changed = true;
                    return {todo:obj.todo, startTime: obj.startTime, accumulatedTime: parseInt(obj.accumulatedTime) + parseInt(timeUsed), isUploaded: obj.isUploaded};
                } else {
                    return obj;
                }
            });

            if (changed) {
                localStorage.setItem("todolist", JSON.stringify(newState))
                return newState;
            } else {
                // console.log("creating new obj")

                
                newState = [...todolist,
                    {
                        todo:todo, 
                        startTime: timer, 
                        accumulatedTime: parseInt(timeUsed),
                        isUploaded: false
                    }]
                }
                localStorage.setItem("todolist", JSON.stringify(newState)) 
                return newState;           
        });

        setStartDoing(false);
    }

    

  return (
    <div id='popBg'>
        <div id='popDoing'>
            <CancelIcon id='cancelIcon' onClick={discard}/>
            <h1>You should be doing:</h1>
            <h2>{todo}</h2>
            <div className='align-btn'>
                <button onClick={discard}>discard</button>
                <button onClick={stopTime}>stop</button>
            </div>
        </div>
    </div>
  );
}
