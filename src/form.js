import { useContext } from 'react';
import  { TodoContext } from './TodoContext';

function Form({setTimer}) {

    const [todolist, setTodolist, newid, setNewid, , setControlStopBtn] = useContext(TodoContext);

    // setTodolist 
    // document.addEventListener('keydown', e=>{
    //     if(e.key === 'Enter') {
    //         submit();
    //     };
    // });

    function submit() {
        setControlStopBtn(true);
        setTimer(new Date().getTime());

        let todo = document.querySelector('.todo').value;
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
        setTodolist( prevState => {
            const filterPrevState = prevState.filter(obj => {
                if (obj.todo === todo) {
                    return true;
                } else {
                    return false;
                }
            });
            // if there is same
            if (filterPrevState.length > 0) {
                return prevState;
            } else {
                // if todolist = []
                if (prevState.length === 0) {
                    prevState = [{id: newid, todo: todo}]
                } else {
                    prevState = [...prevState, {todo: todo}];
                    prevState[prevState.length-1].id = newid;
                }
                // setNewid works
                setNewid(prev => prev + 1);
            }
            return prevState;
        })
        
    }
    return(
        <>
            <div className='questionCenter'>
                <h1>wt are you going to do?</h1>
                <input className='todo' type='text'/>
                <button onClick={submit}>Submit</button>
            </div>
            <br></br>
                {/* <p>(press 'Enter' to submit)</p> */}
        </>
    );
};

export default Form;