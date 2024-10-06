import { useContext, useEffect } from 'react';
import  { TodoContext } from './TodoContext';

function Show() {

    const [todolist] = useContext(TodoContext);
    useEffect(()=>{
        // console.log('hi')
    },[todolist])

    return(
        <>
        {
            todolist.map((obj) => {
                return <div key={obj.id} className='todos'>
                    {obj.todo + ' ' + 'accumulated time: ' + obj.accumulatedTime}
                    </div>
        })}
        </>
    )
};

export default Show;