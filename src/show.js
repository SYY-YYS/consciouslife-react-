import { useContext, useEffect } from 'react';
import  { TodoContext } from './TodoContext';

function Show() {

    const [todolist] = useContext(TodoContext);
    useEffect(()=>{
        console.log(todolist)
    },[todolist])

    return(
        <>
        {todolist != undefined &&
            todolist.map((obj) => {
                return <div key={obj.todo} className='todos'>
                    {obj.todo + ' ' + 'accumulated time: ' + obj.accumulatedTime}
                    </div>
        })}
        </>
    )
};

export default Show;