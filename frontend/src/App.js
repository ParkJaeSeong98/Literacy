import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

function Feature1() {
  return <h2>기능1입니다</h2>;
}

function Feature2() {
  return <h2>기능2입니다</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="App">
          <h2><Link to='/function1'>기능1</Link></h2>
          <h2><Link to='/function2'>기능2</Link></h2>
          <br />
        </div>
        <Routes>
          <Route path="/function1" element={<Feature1></Feature1>} />
          <Route path="/function2" element={<Feature2></Feature2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;