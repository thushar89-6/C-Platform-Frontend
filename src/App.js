import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import { useEffect } from 'react';


function App() {
  // const arr = await fetch("/https://skapi.online/api/question/1")
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://192.168.251.3:8080/');
        console.log(response)
      }
    }
  );
  
  return (
    // <div className = "container">
    //   <div className ="header">C-Platform</div>
    //   {
    //     arr.map(
    //       (ele) => (<Question key={ele} qname={ele}/>)  
    //     )  
    //   }
    // </div>
    <div>hello</div>
  );
}

export default App;

