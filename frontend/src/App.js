import BaseLayout from './BaseLayout';
import HomePage from './HomePage';
import WordRelay from './WordRelay';
import Summary from './Summary';
import PictureBook from './PictureBook';
import React from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import './fonts/fonts.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout></BaseLayout>}>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/function1" element={<Summary></Summary>} />
          <Route path="/function2" element={<PictureBook></PictureBook>} />
          <Route path="/function3" element={<WordRelay></WordRelay>} />
          <Route path="/login" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
