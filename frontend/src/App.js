import WordRelay from './WordRelay';
import Summary from './Summary';
import PictureBook from './PictureBook';
import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const Heading = styled.h2`
  text-align: center;
`;


function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="App">
          <Heading><Link to='/function1'>기능1</Link></Heading>
          <Heading><Link to='/function2'>기능2</Link></Heading>
          <Heading><Link to='/function3'>기능3</Link></Heading>
          <br />
        </div>
        <Routes>
          <Route path="/function1" element={<Summary></Summary>} />
          <Route path="/function2" element={<PictureBook></PictureBook>} />
          <Route path="/function3" element={<WordRelay></WordRelay>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
