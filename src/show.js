import { useContext, useEffect } from 'react';
import  { TodoContext } from './TodoContext';
import axios from 'axios';

function Show() {

    const [todolist,,,,,,,,isLogin] = useContext(TodoContext);
    useEffect(()=>{
        console.log(todolist)
    },[todolist])


    async function upload(e){
        console.log(e.target.parentElement.id)
        let todoIndex = todolist.findIndex(item => item.todo === e.target.parentElement.id);
        let startTime = todolist[todoIndex].startTime;
        let accumulatedTime = todolist[todoIndex].accumulatedTime;

        let dataSending = {
            ToDo: e.target.parentElement.id,
            startTime: startTime,
            accumulatedTime: accumulatedTime
        }
        console.log(dataSending);

        if (isLogin) {
            await axios.post(process.env.REACT_APP_Backend_Url + '/update', dataSending, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res) {
                console.log(res.status, res.data)

            }).catch((err) => {
                console.log(err)
            })
        } else {
            console.log('not logged in')
        }
        
    }

    return(
        <>
        {todolist !== undefined &&
            todolist.map((obj) => {
                return <div id={obj.todo} key={obj.todo} className='todos'>
                    {obj.todo + ' ' + 'accumulated time: ' + obj.accumulatedTime}
                    <button onClick={upload}>upload</button>
                    </div>
        })}
        </>
    )
};

export default Show;