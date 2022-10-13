import './App.css';
import { useState } from 'react';
import Form from './form.js';
import Show from './show.js';
import { TodoProvider } from './TodoContext';
import Waiting from './Waiting';


// add
// 0. useContext V
// 1. time V
// 2. accumulate V
// 3. put web 

function App() {
  
  document.title = 'conscious life (web version)';

  // previous error due to destructuring 
  const [timer, setTimer] = useState(0);

  return (
    <TodoProvider>
      <div>
        <Form setTimer={setTimer}/>
        <Waiting timer={timer}/>
        <Show timer={timer}/>
      </div>
    </TodoProvider>
  );
}

export default App;
