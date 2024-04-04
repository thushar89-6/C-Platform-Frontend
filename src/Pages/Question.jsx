import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Editor from "@monaco-editor/react";
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import MediaQuery from 'react-responsive';
import {ScrollShadow} from "@nextui-org/react";
function Question(props) {

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
  const [result, setResult] = useState();

  const subsolution = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const b = new Blob([code], { type: 'text/plain' });    
    formData.append('file', b);
    formData.append('fileName', `${id}.${lang}`);
    formData.append('id',id);
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
};

useEffect(()=>{
  if (result && result.accepted===true) confetti()  
},[result]);

const [lang,setlang] = useState("cpp");
const [com,setcom]= useState("//Write Your code here")

const [code,setcode]=useState(null);
  return (
    <>
    <div className={`h-screen flex flex-col ${props.toggle.dark?"bg-gray-950":""}`}>
      <Navbar {...props} question={true} setcom={setcom} setlang={setlang} toggledark/>
    
        <MediaQuery query="(max-device-width: 1024px)" className="overflow-scroll">
        <PanelGroup direction="vertical">
          <Panel className='mx-8'>
            <div className='p-3'>
              <h1 key="1"  className='pt-2 pb-2'>{arr && arr.name}</h1>
              <div>{arr && arr.desc.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="2" className='pt-5 pb-2'>Constraints:</h4>
              <div>{arr && arr.constraints.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="3" className='pt-5 pb-2'>Input</h4>
              <div>{arr && arr.input.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="4" className='pt-5 pb-2'>Output</h4>
              <div>{arr && arr.output.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
            </div>
          </Panel>
          <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
        
              <Panel>
                  <Editor language={lang} theme={props.toggle.dark?'vs-dark':'light'} 
                  value={com}
                   onChange={(v,e)=>setcode(v)}
                   options={{minimap: { enabled: false }}}
                   ></Editor>
                 
              </Panel>
              <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
              <Panel >
                 <form onSubmit={subsolution} encType='multipart/form-data'>
                    <div>
                      <Button className="my-3" size="sm" onClick={subsolution}
                      > Submit </Button>
                    </div>
                  </form>

                {result && JSON.stringify(result)}
              </Panel>
      
        </PanelGroup>
        
        </MediaQuery>


        <MediaQuery query="(min-device-width: 1025px)" className='h-screen'>
        <div className="flex-grow">

        <PanelGroup direction="horizontal">

          <Panel className='mx-8' minSize={40}>
            <div className='p-3'>
              <h1 key="1"  className='pt-2 pb-2'>{arr && arr.name}</h1>
              <div>{arr && arr.desc.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="2" className='pt-5 pb-2'>Constraints:</h4>
              <div>{arr && arr.constraints.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="3" className='pt-5 pb-2'>Input</h4>
              <div>{arr && arr.input.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
              <h4 key="4" className='pt-5 pb-2'>Output</h4>
              <div>{arr && arr.output.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
            </div>
          </Panel>

          <PanelResizeHandle className={`w-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>

          <Panel  minSize={20}>
            
            <PanelGroup direction="vertical"  >
              <Panel minSize={20} className='flex-col'>
                  <Editor language={lang} theme={props.toggle.dark?'vs-dark':'light'} 
                  value={com}
                   onChange={(v,e)=>setcode(v)}
                   options={{minimap: { enabled: false }}}
                   ></Editor>
                 
              </Panel>
              <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
              <Panel minSize={20} className='flex flex-col'>
                 <form onSubmit={subsolution} encType='multipart/form-data'>
                    <div className>
                      <Button className="my-3" size="sm" onClick={subsolution}
                      > Submit </Button>
                    </div>
                  </form>
                {result && result.warnings!=="" && 
                  <ScrollShadow className='pl-5'>
                    <div className="text-red-600">Warnings:</div>
                    {result.warnings.split("\n").map((ele)=>(<div>{ele}</div>))}
                  </ScrollShadow>
                }
                {result && result.warnings==="" && result.total==result.passed && 
                <ScrollShadow className='pl-5'>
                <div className="text-green-600">Accepted</div>
                {`Passed ${result.passed}/${result.total} testcases.` }
              </ScrollShadow>
                }
                 {result && result.warnings==="" && result.total!=result.passed && 
                <ScrollShadow className='pl-5'>
                <div className="text-grey-600">All testcases are not passed</div>
                {`Passed ${result.passed}/${result.total} testcases.` }
              </ScrollShadow>
                }

              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
        </div>

        </MediaQuery>

      
      </div>
    </>
  )
}

export default Question