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
      <div className='information'>
        <h2>
          <strong>Description:</strong><br />
          This app aims to replicate a python app that the coder uses, which records time spent into an excel file (shown in coder's <a href='https://syy-yys.github.io/mywebpage/' target={'_blank'} rel="noreferrer">personal website</a>).<br />
          Accumulated time of repeated items will be shown in same line.<br />
          It won't save your records when you leave the page, so please just use it for daily records.<br />
          <br />
          <strong>How To Use:</strong>
          <ol>
            <li>1. Submit what you are going to do</li>
            <li>2. Press 'Stop' button to record the time spent on what you were doing</li>
          </ol>
          <br />
        </h2>
      </div>
      <div>
        <Form setTimer={setTimer}/>
        <Waiting timer={timer}/>
        <Show timer={timer}/>
      </div>
    </TodoProvider>
  );
}

export default App;
