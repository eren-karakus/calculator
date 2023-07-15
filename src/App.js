import logo from './logo.svg'
import React from 'react';
import Calculator from './Calculator';
import './App.css';

export const OpsAndEntryContext = React.createContext();
const ENTRY_CHAR_LIMIT = 20;

function App() {
  const [currEntry, rawSetCurrEntry] = React.useState("0");
  const [opsArray, setOpsArray] = React.useState([0]);
  const [isNewEntryExpected, setNewEntryExpected] = React.useState(true);

  const setCurrEntry = newEntry => { // wrapping raw current entry setting function to add a max digit char limit
    let digitCount = (newEntry.match(/\d/g) || []).length
    if (digitCount <= ENTRY_CHAR_LIMIT) {
      rawSetCurrEntry(newEntry)
    } else {
      rawSetCurrEntry('Overflow');
      setOpsArray([0]);
      setNewEntryExpected(true);
    }
  }

  return (
    <OpsAndEntryContext.Provider value={{opsArray, setOpsArray, currEntry, setCurrEntry, isNewEntryExpected, setNewEntryExpected}}>
      <div className="App">
        <header className="App-header">
          Simple Calculator
        </header>
        <main className='App-main'>
          <Calculator type="standard"/>
        </main>
        <footer className='App-footer'><img width={60} alt='react logo' src={logo}></img><br/>Made with React <br/>by Eren Karakuş, 2023</footer>
      </div>
    </OpsAndEntryContext.Provider>
  );
}

export default App;
