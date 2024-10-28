import { useContext, useEffect, useState } from 'react';
import  { TodoContext } from './TodoContext';

import FixedContainer from './Doing';


function Form({timer, setTimer}) {

    const [todolist, setTodolist, newid, setNewid, , setControlStopBtn, todo, setTodo] = useContext(TodoContext);
    const [startDoing, setStartDoing] = useState(false);

    // setTodolist 
    document.addEventListener('keydown', e=>{
        if(e.key === 'Enter') {
            // directly use submit() rendor more than once: dky
            document.querySelector('#submit').click();
        };
    });

    function submit() {
        let todo = document.querySelector('.todo').value;
        if (todo === '') {

        } else {
            // refresh shdnt cancel the start record
            let Ltodolist = JSON.parse(localStorage.getItem("todolist"))
            let currentTime = new Date().getTime()
            
            // shd filter if there is same todo
            if (Ltodolist) {
                let sameTodo = false;
                Ltodolist = Ltodolist.map((obj, index) => {
                    if (obj.todo === todo) {
                        obj.startTime = currentTime;
                        obj.Done = false;
                        sameTodo = true
                        return obj;
                    }
                    return obj;
                })
                console.log(Ltodolist)
                if (sameTodo) {
                    localStorage.setItem("todolist", JSON.stringify(Ltodolist))
                    setTodolist(Ltodolist)
                } else {
                    localStorage.setItem("todolist", JSON.stringify(
                        [...Ltodolist, {
                            todo:todo, 
                            startTime: currentTime, 
                            accumulatedTime: 0,
                            isUploaded: false
                        }]
                    ))
                    setTodolist(prev => {
                        return [...prev,
                            {
                                todo:todo, 
                                startTime: currentTime, 
                                accumulatedTime: 0,
                                isUploaded: false
                            }]
                    })
                }
                
            } else {
                localStorage.setItem("todolist", JSON.stringify([
                    {
                        todo:todo, 
                        startTime: currentTime, 
                        accumulatedTime: 0,
                        isUploaded: false
                    }
                ]))
                setTodolist([
                    {
                        todo:todo, 
                        startTime: currentTime, 
                        accumulatedTime: 0,
                        isUploaded: false
                    }
                ])
            }
            
            
            
            setTimer(currentTime);
            setTodo(todo);
            setStartDoing(true);
        }
    }

    // check if any processing todo
    useEffect(() => {
        let Ltodolist = JSON.parse(localStorage.getItem("todolist"));
        console.log(Ltodolist, typeof(Ltodolist))
        if (Ltodolist) {
            Ltodolist.forEach((obj, index) => {
                console.log("obj.Done: " + obj.Done)
            if (!obj.Done && obj.Done !== undefined) {
                setStartDoing(true);
                setTodo(obj.todo);
                setTimer(obj.startTime);
            }
        })
        }
        
    },[])
    

    return(
        
        <div className='questionCenter'>
            {startDoing && <FixedContainer timer={timer} setStartDoing={setStartDoing}/>}
            <div className='innerQCenter'>
                <h1>ToDo</h1>
                <div className='input-area'>
                    <input className='todo' type='text'/>
                    <button id='submit' onClick={submit}>Submit</button>
                </div>
            </div>
            
            <p>(press 'Enter' to submit)</p>
        </div>
    );
};

export default Form;