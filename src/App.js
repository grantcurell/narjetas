import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import LookupWord from "./components/LookupWord/LookupWord";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LookupWordContainer from "./components/LookupWord/LookupWordContainer";

const testComponentConfiguration = [
  {
    type: 'Type1'
  },
  {
    type: 'Type2'
  },
  {
    type: 'Type3'
  }
];

const mapPropsToComponent = ( component, props ) => {

  return { ...(component.props || props), type: component.type };

};

function App() {

  const [globalSettings, setGlobalSettings] = useState({
    language: "Norwegian"
  });

  const handleLanguageChange = (newLanguage) => {
    setGlobalSettings((prevSettings) => ({
      ...prevSettings,
      ["language"]: newLanguage
    }));
  };

  return (
      <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<LookupWordContainer />} />
          <Route path='/LookupWord' element={<LookupWordContainer />} />
        </Routes>
      </Router>
      <SelectLanguage onChange={handleLanguageChange} />
      Your language is {globalSettings.language}
      </div>
  );
}

export default App;
