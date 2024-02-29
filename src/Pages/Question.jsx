import Navbar from '../Components/Navbar';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { Button } from '@nextui-org/react';

function Question() {
  //get id of current question page
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  //fetch content of current question
  const [arr, setarr] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/question?id=${id}`);
      const data = await response.json();
      setarr(data);
    };
    fetchData();
  }, [id]);

  //file upload
  const [file, setFile] = useState();
  const fileref = useRef();
  const [result, setResult] = useState();
  
  const subsolution = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    fetch(`${process.env.REACT_APP_API_URL}/document`, {
    method: 'POST',
    body: formData
    }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    console.log('Upload successful:', data);
    setResult(data)
  }).catch(error => {
    console.error('There was a problem with the file upload:', error);
  });
  fileref.current.value=null;
};


  return (
    <>
    <div className='h-screen flex flex-col' >
      <Navbar/>
      <div className="flex-grow">

      <PanelGroup direction="horizontal" className="bg-slate-950">
          <Panel>
            <div className='p-3'>
              <h1 className='pt-2 pb-2'>{arr && arr.name}</h1>
              <p>{arr && arr.desc}</p>
              <h4 className='pt-5 pb-2'>Constraints:</h4>
              <p>{arr && arr.constraints}</p>
              <h4 className='pt-5 pb-2 whitespace-pre'>Input</h4>
              <div>{arr && arr.input.split("\n").map((ele)=>(<div>{ele}</div>))}</div>
              <h4 className='pt-5 pb-2'>Output</h4>
              <div>{arr && arr.output.split("\n").map((ele)=>(<div>{ele}</div>))}</div>
            </div>
          </Panel>
          <PanelResizeHandle className="w-1 bg-gray-900"/>
          <Panel>
            <PanelGroup direction="vertical"  >
              <Panel className='flex justify-center items-center'>
                  <form onSubmit={subsolution} encType='multipart/form-data'>
                    <input type="file" name="file" ref={fileref} onChange={(e) => { setFile(e.target.files[0]) }}></input>
                    <div>
                      <Button className="my-3" size="sm" onClick={subsolution}> Submit </Button>
                    </div>
                  </form>
              </Panel>
              <PanelResizeHandle className='h-1 bg-gray-900'/>
              <Panel minSize={10}>
                {result && JSON.stringify(result)}
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
      </div>
    </>
  )
}

export default Question