import './App1.css';
import { useState } from 'react';
import Form from './form.js';
import Show from './show.js';
import { TodoProvider } from './TodoContext';
import Waiting from './Waiting';
import Clock from './Clock.js';

import About from './about.js';
import Home from './home.js';

import SwipeableTemporaryDrawer from './SwipeableDrawer.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
      <SwipeableTemporaryDrawer />
      <Clock />
      <Router>
        <Routes>
          <Route path='/' exact Component={<Home timer={timer} setTimer={setTimer}/>}></Route>
          <Route path='/about' Component={<About />}></Route>
          {/* <Route path='/' exact Component={<Home />}></Route> */}
        </Routes>
      </Router>
      
    </TodoProvider>
  );
}

export default App;
