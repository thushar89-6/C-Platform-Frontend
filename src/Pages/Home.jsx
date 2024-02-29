import Navbar from '../Components/Navbar';
import Question from '../Components/Question';
import { useEffect, useState} from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "../Components/ListboxWrapper";

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
      <div className="h-screen max-w-700 content-center items-center align-middle"> 
        <ListboxWrapper className="max-w-700">
          <Listbox className='max-w-700'>
            {arr && arr.map((ele)=>(<ListboxItem key={ele.id}>
              <Question key={ele.id} qname={ele.name} id={ele.id}></Question>
            </ListboxItem>))}          
          </Listbox>
        </ListboxWrapper>
      </div>
      </>
  )
  }

export default Home