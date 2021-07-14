import './App.css';
import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'



function App() {
  //state for the results
  const [results, setResults] = React.useState([])

  //state for current search word
  const [currentWord, setCurrentWord] = React.useState("")
  
  const searchInput = React.useRef()
  const results_list = results.map((example)=>{
    return <li dangerouslySetInnerHTML={{ __html: example }} />
  } )
  
  //function to call the search api
  const Search = ((word) => {
    axios.get("http://localhost:5000/"+word).then((res)=> {
      setCurrentWord(word)
      setResults(res.data.results)
    })
  });

  return (
    <>
    <div className="App">
      {/* <input type="text" ref={searchInput} /> */}
      <div class="container">
        <br/><br/>
        <FormControl
          ref={searchInput}
          placeholder="Search Entry"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        <Button variant="primary" onClick={() => Search(searchInput.current.value)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </Button>
        <br/>
        <br/>
        {currentWord && <p className="title">Examples entries of <b>{currentWord}</b></p>}
        <ul>
          {results_list}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;
