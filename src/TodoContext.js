import { useState, createContext } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const [todolist, setTodolist] = useState([]);
    const [newid, setNewid] = useState(1);
    const [controlStopBtn, setControlStopBtn] = useState(false);
    const [todo, setTodo] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [sevenday, setSevenday] = useState([]);
    const [itemstodate, setItemtodate] = useState([])
    const [loading, setLoading] = useState(false)

    return(
        <TodoContext.Provider value={[todolist, setTodolist, newid, setNewid, controlStopBtn, setControlStopBtn, todo, setTodo, isLogin, setIsLogin, sevenday, setSevenday, itemstodate, setItemtodate, loading, setLoading]}>
            {props.children}
        </TodoContext.Provider>
    );
} 