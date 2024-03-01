import Navbar from '../Components/Navbar';
import { useEffect, useState} from 'react';
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {ListboxWrapper} from "../Components/ListboxWrapper";
import {Divider} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import React from 'react';


function Home(props) {
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
      <div className='h-screen'> 
        <Navbar {...props}></Navbar>
        <div className='flex justify-center'>
          <ListboxWrapper>
            <Listbox>
              {arr && arr.map((ele,index)=>(
                  <ListboxItem className="">
                    <Link to={`/question?id=${ele.id}`}> 
                    {ele.name}
                    </Link>
                  <Divider className='mt-2'/>
                  </ListboxItem>
              ))}          
            </Listbox>
          </ListboxWrapper>
        </div>
      </div>
      </>
  )
  }

export default Home