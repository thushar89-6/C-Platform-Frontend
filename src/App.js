import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Question from './Components/Question';
import { useEffect, useState} from 'react';


function App() {
  const [arr,setarr] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://192.168.62.3:8080/');
        const data = await response.json();
        setarr(data);
    };
    fetchData();
  }, []);



  return (
    <>
    <Navbar></Navbar>
    {arr && arr.map((ele)=>(<Question key={ele} qname={ele.desc}/>))}
    </>
)
}

export default App;

