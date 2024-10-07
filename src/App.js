import './App1.css';
import { useState } from 'react'; 
import { TodoProvider } from './TodoContext';

import Clock from './Clock.js';

import About from './about.js';
import Home from './home.js';
import DataAnalyze from './DataAnalyze.js';
import DoneToday from './DoneToday.js';


import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
      
      <Clock />
      <Router>
        <Routes>
          <Route path='/' element={<Home timer={timer} setTimer={setTimer}/>}></Route>
          <Route path='/DoneToday' element={<DoneToday/>}></Route>
          <Route path='/DataAnalyze' element={<DataAnalyze/>}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
