import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import LookupWord from "./components/LookupWord/LookupWord";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";

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
    language: "norwegian"
  });

  const handleLanguageChange = (newLanguage) => {
    setGlobalSettings((prevSettings) => ({
      ...prevSettings,
      ["language"]: newLanguage
    }));
  };

  return (
    <div>
      <SelectLanguage onChange={handleLanguageChange} />
      Your language is {globalSettings.language}
    </div>
  );
}

export default App;
