import React, {useState} from "react";
import './App.css';

function App() {
    const [id, setId] = useState(null);

  const handleOnChange = (e) => {
    [e.target.name] = e.target.value;
    setId(e.target.value);
  }

  const submit = () => {
      const post = {
          id
      };

      fetch('http://localhost:3001/hello', {
          method: 'post',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify(post),
      });
  }

  return (
    <div className="App">
      <input onChange={handleOnChange} name={"id"} />
      <button onClick={submit}>Submit</button>
        <h1>{id}</h1>
    </div>
  );
}

export default App;
