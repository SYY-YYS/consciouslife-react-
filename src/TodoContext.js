import { useState, createContext } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const [todolist, setTodolist] = useState([]);
    const [newid, setNewid] = useState(1);
    const [controlStopBtn, setControlStopBtn] = useState(false);

    return(
        <TodoContext.Provider value={[todolist, setTodolist, newid, setNewid, controlStopBtn, setControlStopBtn]}>
            {props.children}
        </TodoContext.Provider>
    );
} 