import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home'
import Question from './Pages/Question'

function App() {
  const [dark,setdark] = useState(false);
  return (
        <main className={dark ? "dark text-foreground bg-background": ""}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home toggle={{dark,setdark}}/>} />
              <Route path="/question/*" element={<Question toggle={{dark,setdark}}/>} /> 
            </Routes>
          </BrowserRouter>   
        </main>
  );
}

export default App;

