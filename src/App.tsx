import React, { useState } from 'react';
import './App.css';

function App() {

  const [urlfield, setUrlfield] = useState('');
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [imgFile, setimgFile] = useState('');
  const [showResult, setShowResult] = useState(false);

  const apiLive = 'http://image-filter-microservice-dev.us-west-2.elasticbeanstalk.com';
  const apiLocal = 'http://localhost:8000';

  const getResponse = async () => {
    if(urlfield !== "") {

      try {
        setIsFetching(true);
  
        const res = await fetch(`${apiLive}/api/v0/filteredImage?image_url=${urlfield}`);
        console.log(res);
        
        const imageBlob = await res.blob();
        console.log(imageBlob);
  
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
        
        setimgFile(imageObjectURL);
  
        setError('');
        setIsFetching(false);
        setShowResult(true);
      } catch (error) {
        setError('Unable to establish communication with aws resource...');
        setIsFetching(false);
      }
      
    }else{
      setError('Please provide an image url in the text field');
    }
  }

  return (
    <div className="App">

      <h2 className='center-text margin-bottom-md'>AWS Image Filter Microservice</h2>

      <div className='filter-input-view'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlfeLzz4mp5DXXd-Ki5lB4MgjVKRGGvkcn-NN1HqGd5nv4cadpJLfCIQtyR42Y-MM8WQ&usqp=CAU' alt='spongebob filter microservice'/>

          <div className='inputs'>
              <input type='text' placeholder="Provide image url -- TIP: drag spongebob's image here" value={urlfield} onChange={(e) => setUrlfield(e.target.value)} />
              {
                isFetching ? <span className='center-text'>processing....</span> : <button className='btn' onClick={() => getResponse()}>PROCCESS</button>
              }
              <p className='error'>{error}</p>
          </div>
      </div>

      <div className={`${!showResult ? 'hide' : ''}`}>
          <hr/>

          <h1>RESULT</h1>
          
          <div className='filter-result-view'>
              <img src={imgFile} alt='' />

              <div className='result-info'>
                <p>An image filter microservice served directly from amazon's elastic beanstalk. Runs in a node js environment and uses typescript.</p>
                <p>Why elastic beanstalk (ebs)? This way i can easily make reference to the resources i need on a go, this project needs to run on an ec2 instance, with autoscaling groups configured, load balancing, cloudwatch metrics and more.</p>
                <p>Setting up these resources takes a while, but with ebs, you can get a project deployed and running in minutes</p>
                <p>Check out it's codebase on my github.</p>
                <a href='https://github.com/michealgabriel/image-filter-project' target='_blank' rel='noreferrer' className='btn'>SOURCE</a>
              </div>
          </div>
      </div>

    </div>
  );
}

export default App;
