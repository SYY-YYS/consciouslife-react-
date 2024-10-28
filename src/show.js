import { useContext, useEffect, useState } from 'react';
import  { TodoContext } from './TodoContext';
import axios from 'axios';

import { convertTime } from './home';
import LoadingPage from './loading';

function Show() {

    const [todolist,setTodolist,,,,,,,isLogin,,,,,,loading, setLoading] = useContext(TodoContext);
    const [response, setResponse] = useState("")

    useEffect(()=>{
        console.log("first load: " + todolist)

        // load localStorage to react todolist state
        if(todolist.length === 0) {
            console.log('todolist length = 0')
            const checkLocal = localStorage.getItem('todolist');
            if (checkLocal) {
                let Ltodolist = JSON.parse(checkLocal);
                Ltodolist = Ltodolist.filter(todo => {
                    // erase not today's todo
                    if (todo.startTime < new Date().setHours(0,0,0,0)){
                        console.log('previous record: ' +todo.startTime < new Date().setHours(0,0,0,0))
                        return false;
                    } else {
                        return true;
                    }
                })
                console.log(Ltodolist)
                localStorage.setItem('todolist', JSON.stringify(Ltodolist))
                setTodolist(Ltodolist)
            }
        }
        
    },[])

    

    async function upload(e){
        
        console.log(e.target.parentElement.id)
        let todoIndex = todolist.findIndex(item => item.todo === e.target.parentElement.id);
        let startTime = todolist[todoIndex].startTime;
        let accumulatedTime = parseInt(todolist[todoIndex].accumulatedTime);

        let dataSending = {
            ToDo: e.target.parentElement.id,
            startTime: startTime,
            accumulatedTime: accumulatedTime
        }
        console.log(dataSending);

        if (isLogin) {
            setLoading(true)
            await axios.post(process.env.REACT_APP_Backend_Url + '/update', dataSending, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res) {
                console.log(res.status, res.data)
                if (res.data === 'updated') {
                    // set isUploaded to true and disable the upload btn(maybe also the item)
                    let Ltodolist = JSON.parse(localStorage.getItem('todolist'));
                    Ltodolist = Ltodolist.map(obj => {
                        if (obj.todo === e.target.parentElement.id) {
                            obj.isUploaded = true;
                        }
                        return obj;
                    })
                    console.log("Ltodolist: " + Ltodolist)
                    localStorage.setItem("todolist", JSON.stringify(Ltodolist))
                    setTodolist(Ltodolist)
                    setResponse('Updated')
                } 
                setLoading(false)

            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
        } else {
            setResponse('Please first login')
        } 
        
    }

    return(
        <>
        <div style={{fontSize: '13px', color: 'red'}}>{response}</div>
        {todolist !== undefined &&
            todolist.map((obj) => {
                console.log("obj " + obj)
                if (!obj.isUploaded) {
                    return <div id={obj.todo} key={obj.todo} className='todos'>
                    {obj.todo + ' : ' + convertTime(obj.accumulatedTime)}
                    <button onClick={upload}>upload</button>
                    </div>
                }             

        })}
        </>
    )
};

export default Show;