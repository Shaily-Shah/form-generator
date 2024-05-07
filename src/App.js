import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header'
import GenerateForm from './components/generate-form/GenerateForm';
import Home from './components/home/Home';
import { createContext, useState } from 'react';

export const MyContext = createContext();

function App({ children }) {
  const [data, setData] = useState([])
  return (


    <MyContext.Provider value={{data,setData}}>

      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<GenerateForm />}
            ></Route>
            <Route
              path="/home"
              element={<Home />}
            ></Route>

          </Routes>
        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
