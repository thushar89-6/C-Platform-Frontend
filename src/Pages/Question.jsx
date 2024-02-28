import Navbar from '../Components/Navbar';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
      <Navbar></Navbar>
      {JSON.stringify(arr)}
      <div>
        <form onSubmit={subsolution} encType='multipart/form-data'>
          <input type="file" name="file" ref={fileref} onChange={(e) => { setFile(e.target.files[0]) }}></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        {result && JSON.stringify(result)}
      </div>
    </>
  )
}

export default Question