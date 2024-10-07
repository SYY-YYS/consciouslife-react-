import * as React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import { useContext } from 'react';
import  { TodoContext } from './TodoContext';

export default function FixedContainer({timer, setStartDoing}) {

    const [todolist,setTodolist,,,,,todo] = useContext(TodoContext);

    function discard(){
        setStartDoing(false)
    }

    function stopTime(){
        // time in second
        let timeUsed = ((new Date().getTime() - timer)/1000).toFixed(0);
        

        // learnt: hv to return sth for not edited ones and return the exact obj in map
        setTodolist(prevState => {
            let changed = false;
            
            let newState = prevState.map(obj => {
                if (obj.todo === todo) {
                    changed = true;
                    return {todo:obj.todo, startTime: obj.startTime, accumulatedTime: obj.accumulatedTime + timeUsed};
                } else {
                    return obj;
                }
            });

            if (changed) {
                return newState;
            } else {
                // console.log("creating new obj")

                return [...todolist,
                    {
                        todo:todo, 
                        startTime: timer, 
                        accumulatedTime: timeUsed
                    }]
                }            
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
