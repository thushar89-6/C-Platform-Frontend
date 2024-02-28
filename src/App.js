import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Question from './Pages/Question'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/question/*" element={<Question/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

