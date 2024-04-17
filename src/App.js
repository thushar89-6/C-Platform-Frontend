import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Pages/Home'
import Question from './Pages/Question'
import Login  from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const [session,setSession]=useState(null);
  const [dark,setdark] = useState(false);
  const [loggedin,setLoggedin] = useState(false);
  useEffect(()=>{
    const c = document.cookie.split("=")[1]
    console.log(c)
        if (c) {
          setLoggedin(true);
            fetch(`${process.env.REACT_APP_API_URL}/session`, {
              method: 'GET',
              credentials: 'include',
              }).then(response => response.json()).then(data => setSession(data)).catch(error => {
                console.error('There was a problem with login', error);
              });   
        }
  },[])


  return (
        <main className={dark ? "dark text-foreground bg-background": ""}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home toggle={{dark,setdark}} session={session} loggedin={loggedin}/>} />
              <Route path="/question/*" element={<Question toggle={{dark,setdark}}   session={session} loggedin={loggedin} setlogin={setLoggedin}/>}/> 
              <Route path="/login" element={<Login toggle={{dark,setdark}}  session={session} loggedin={loggedin}/>}/>
              <Route path="/register" element={<Register toggle={{dark,setdark}} session={session} loggedin={loggedin}/>} />

            </Routes>
          </BrowserRouter>   
        </main>
  );
}

export default App;

