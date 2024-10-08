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
        let todo = document.querySelector('.todo').value;
        if (todo === '') {

        } else {
            setTimer(new Date().getTime());

            setTodo(todo);
            setStartDoing(true);
        }
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