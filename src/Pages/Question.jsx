import Navbar from '../Components/Navbar';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Editor from "@monaco-editor/react";

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

const [lang,setlang] = useState("cpp");


const [code,setcode]=useState(null);
  return (
    <>
    <div className='h-screen flex flex-col' >
      <Navbar {...props} question={true} language={{setlang}} toggledark/>
      <div className="flex-grow">

      <PanelGroup direction="horizontal">
          <Panel className='mx-8' minSize={40}>
            <div className='p-3'>
              <h1 key="1"  className='pt-2 pb-2'>{arr && arr.name}</h1>
              <p>{arr && arr.desc}</p>
              <h4 key="2" className='pt-5 pb-2'>Constraints:</h4>
              <p>{arr && arr.constraints}</p>
              <h4 key="3" className='pt-5 pb-2 whitespace-pre'>Input</h4>
              <div>{arr && arr.input.split("\n").map((ele)=>(<div>{ele}</div>))}</div>
              <h4 key="4" className='pt-5 pb-2'>Output</h4>
              <div>{arr && arr.output.split("\n").map((ele,idx)=>(<div key={idx}>{ele}</div>))}</div>
            </div>
          </Panel>
          <PanelResizeHandle className={`w-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
          <Panel  minSize={20}>
            <PanelGroup direction="vertical"  >
              <Panel minSize={20} className='flex-col'>
                  <Editor language={lang} theme={props.toggle.dark?'vs-dark':'light'} 
                  defaultValue="//write code here"
                   onChange={(v,e)=>setcode(v)}
                   options={{minimap: { enabled: false }}}
                   ></Editor>
                  {/* <form onSubmit={subsolution} encType='multipart/form-data'>
                    <input type="file" name="file" ref={fileref} onChange={(e) => { setFile(e.target.files[0]) }}></input>
                    <div>
                      <Button className="my-3" size="sm" onClick={subsolution}> Submit </Button>
                    </div>
                  </form> */}
              </Panel>
              <PanelResizeHandle className={`h-1 ${props.toggle.dark? "bg-gray-800" : "bg-blue-50"}`}/>
              <Panel minSize={20}>
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