import './App.css';
import React, {useState} from 'react';
import { GetData } from "./GetData";
import { LogoBar } from "./LogoBar"

function App() {
  const [query, setQuery] = useState({})
  

  return (
    <div className="app">
      <LogoBar />
      <GetData />
    </div>
  );
}

export default App;
