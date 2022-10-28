import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import LookupWord from "./components/LookupWord/LookupWord";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LookupWordContainer from "./components/LookupWord/LookupWordContainer";
import { getSupportedConfigs } from './components/Providers/ProviderTemplates/SupportedConfigs';


function App() {

  const supportedConfigs = getSupportedConfigs();

  const [globalSettings, setGlobalSettings] = useState({
    language: "nb"
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
          <Route path='/' exact element={<LookupWordContainer language={globalSettings.language}/>} />
          <Route path='/LookupWord' element={<LookupWordContainer language={globalSettings.language}/>} />
        </Routes>
      </Router>
      <SelectLanguage onChange={handleLanguageChange} />
      Your language is {globalSettings.language}
    </div>
  );
}

export default App;
