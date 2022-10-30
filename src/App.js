import logo from './logo.svg';
import './App.css';
import { useState, useMemo } from "react";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LookupWord from "./components/LookupWord/LookupWord";
import { getSupportedConfigs } from './components/Providers/SupportedConfigs';


function App() {

  // TODO - Follow up on this with
  // https://stackoverflow.com/questions/74245335/reactjs-run-once-on-component-mount-but-before-return

  // Define the supported configs as we mount. This will only compute once and
  // unless  there is a change won't rerun if the component rerenders
  const supportedConfigs = useMemo(() => {
    return getSupportedConfigs();
  }, []);

  // Define the initial globalSettings for the component
  const [globalSettings, setGlobalSettings] = useState({
    language: "nb"
  });

  // Handle the user changing the app language
  const handleLanguageChange = (newLanguage) => {
    setGlobalSettings((prevSettings) => ({
      ...prevSettings,
      ["language"]: newLanguage
    }));
  };

  console.log("About to return.");
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {['/', '/LookupWord'].map((path) => (
            <Route path={path} element={supportedConfigs && 
              <LookupWord language={globalSettings.language}
                          supportedConfigs={supportedConfigs}/>}
            />
          ))}
        </Routes>
      </Router>
      <SelectLanguage onChange={handleLanguageChange} />
      Your language is {globalSettings.language}
    </div>
  );
}

export default App;
