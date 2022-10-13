import { useContext } from 'react';
import  { TodoContext } from './TodoContext';

const Waiting = ({timer}) => {

    const [todolist, setTodolist, newid, , controlStopBtn, setControlStopBtn] = useContext(TodoContext);
    let checkTodo = (todolist.length === 0) ? false : true;

    function recordTime() {
        setControlStopBtn(false);
        let timeUsed = ((new Date().getTime() - timer)/60000).toFixed(0);
        let todo = document.querySelector('.todo').value;
        // wont change the state, try using setTodolist
        // todolist.forEach(obj => {
        //     if (obj.id === newid - 1) {
        //         if (!obj.accumulatedTime) {
        //             obj.accumulatedTime = '+' + timeUsed + 's';
        //         } else {
        //             obj.accumulatedTime += '+' + timeUsed + 's';
        //         }
        //     }
        // });

        // learnt: hv to return sth for not edited ones and return the exact obj in map
        setTodolist(prevState => {
            prevState = prevState.map(obj => {
                if (obj.todo === todo) {
                    if (!obj.accumulatedTime) {
                        return {id:obj.id, todo:obj.todo, accumulatedTime: ' +' + timeUsed + 'min'};
                    } else {
                        return {id:obj.id, todo:obj.todo, accumulatedTime: obj.accumulatedTime + ' +' + timeUsed + 'min'};
                    }
                } else {
                    return obj
                }
            });
            return prevState;
        });
        console.log(newid);
    };

    return (
        <>
            { checkTodo && 
                <h1>
                    You should be doing: {document.querySelector('.todo').value}
                </h1>}
            {controlStopBtn && <button onClick={recordTime}>Stop</button>}
        </>
    );
}
 
export default Waiting;