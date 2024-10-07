import { useContext, useState } from 'react';
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
        setControlStopBtn(true);
        setTimer(new Date().getTime());

        setTodo(document.querySelector('.todo').value);
        setStartDoing(true);

        // let checkList = todolist.filter(obj => {
        //     if (todo === obj.todo) {
        //         return true;
        //     }
        // })
        // console.log('check:', checkList)

        // method to prevent repeated item
        // 0. directlly check todo (for loop => false, true, ran...)
        // 1. checklist
        // 2. 

    //     let check = true;
    //     for (let i = 0; i < todolist.length; i++) {
    //         if (todolist[i].todo === todo) {
    //             check = false;
    //             break;
    //         }
    //     }
    //     if (check) {
    //         setTodolist([...todolist, {id: newid, todo: todo}])
    //         setNewid(newid + 1);
    //     }
    // }

        // current error: newid always = 1 (wont if use cursor to click button)
        // setTodolist( prevState => {
        //     const filterPrevState = prevState.filter(obj => {
        //         if (obj.todo === todo) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     });
        //     // if there is same
        //     if (filterPrevState.length > 0) {
        //         return prevState;
        //     } else {
        //         // if todolist = []
        //         if (prevState.length === 0) {
        //             prevState = [{id: newid, todo: todo}]
        //         } else {
        //             prevState = [...prevState, {todo: todo}];
        //             prevState[prevState.length-1].id = newid;
        //         }
        //         // setNewid works
        //         setNewid(prev => prev + 1);
        //     }
        //     return prevState;
        // })
        
    }
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