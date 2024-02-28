import Navbar from '../Components/Navbar';
import Question from '../Components/Question';
import { useEffect, useState} from 'react';

function Home() {
    const [arr,setarr] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(process.env.REACT_APP_API_URL);
          const data = await response.json();
          setarr(data);
      };
      fetchData();
    }, []);
  
  
  
    return (
      <>
      <Navbar></Navbar>
      {arr && arr.map((ele)=>(<Question key={ele.id} qname={ele.name} id={ele.id}></Question>))}
      </>
  )
  }

export default Home