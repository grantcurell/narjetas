import logo from './logo.svg';
import './App.css';
import { useState, useMemo } from "react";
import SelectLanguage from "./components/SelectLanguage/SelectLanguage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LookupWord from "./components/LookupWord/LookupWord";
import { getSupportedConfigs } from './components/Providers/SupportedConfigs';
import Flashcards from './components/Flashcards/Flashcards';


function App() {

  // https://github.com/grantcurell/narjetas/issues/20
  // TODO - I already know this is bad. Needs to be moved
  let flashCardWordList = [];
  
  function setWordList(list) {
    flashCardWordList = list;
    return flashCardWordList;
  }

  function removeFromWordList(removeWord) {
    flashCardWordList = flashCardWordList.filter(word => word !== removeWord)
    return flashCardWordList[0];
  };

  function getWordList() {
    return flashCardWordList;
  }

  let flashcardData = {};
  
  function addFlashcardData(word, data) {
    flashcardData[word] = data;
  }

  function getFlashcardData() {
    return flashcardData;
  }

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

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {['/', '/LookupWord'].map((path, index) => (
            <Route key={index} path={path} element=
              {
                supportedConfigs ? 
                  <LookupWord language={globalSettings.language}
                          supportedConfigs={supportedConfigs}/>
                  : null
              }
            />
          ))}
          <Route path='flashcards' 
          element={<Flashcards language={globalSettings.language} 
          supportedConfigs={supportedConfigs} 
          setWordList={setWordList} 
          removeFromWordList={removeFromWordList} 
          getWordList={getWordList}
          addFlashcardData={addFlashcardData}
          getFlashcardData={getFlashcardData}/>}/>
        </Routes>
      </Router>
      <SelectLanguage onChange={handleLanguageChange} />
      Your language is {globalSettings.language}
    </div>
  );
}

export default App;
