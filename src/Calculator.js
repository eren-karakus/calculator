import './Calculator.css'
import NumberButton from './buttons/NumberButton';
import OperationButton from './buttons/OperationButton';
import { OpsAndEntryContext } from './App';
import { useContext } from 'react';

function Calculator(props){
    const { opsArray, setOpsArray, currEntry, setCurrEntry, isNewEntryExpected, setNewEntryExpected } = useContext(OpsAndEntryContext);

    return (
        <div className="calculator">
          <p id="operations">{ opsArray.join(" ") }</p>
          <p id="result">{ currEntry }</p>
          <OperationButton value="=" className="btn" id="equal">=</OperationButton>
          <button className="btn" id="CE" onClick={() => setCurrEntry("0")}>CE</button>
          <button className="btn" id="C" onClick={() => {setCurrEntry("0"); setOpsArray([0]);}}>C</button>
          <button className="btn" id="back" onClick={() => currEntry.length===1 ? setCurrEntry("0") : setCurrEntry(currEntry.slice(0,-1))}>&lt;=</button>
          
          <NumberButton value="7" className="btn">7</NumberButton>
          <NumberButton value="8" className="btn">8</NumberButton>
          <NumberButton value="9" className="btn">9</NumberButton>
          <OperationButton value="+" className="btn operator">+</OperationButton>

          <NumberButton value="4" className="btn">4</NumberButton>
          <NumberButton value="5" className="btn">5</NumberButton>
          <NumberButton value="6" className="btn">6</NumberButton>
          <OperationButton value="-" className="btn operator">-</OperationButton>

          <NumberButton value="1" className="btn">1</NumberButton>
          <NumberButton value="2" className="btn">2</NumberButton>
          <NumberButton value="3" className="btn">3</NumberButton>
          <OperationButton value="*" className="btn operator">x</OperationButton>

          <button className="btn" onClick={() => currEntry.includes("-") ? setCurrEntry(currEntry.slice(1)) : setCurrEntry("-" + currEntry) }>+/-</button>
          <NumberButton value="0" className="btn">0</NumberButton>
          <button className="btn" onClick={() => {
                          if (isNewEntryExpected) {
                            setCurrEntry("0.");
                            setNewEntryExpected(false);
                          } else {
                            if (!currEntry.includes(".")) 
                            setCurrEntry(currEntry + ".")
                          }
                        }}>.</button>
          <OperationButton value="/" className="btn operator">/</OperationButton>

        </div>
    );
}

export default Calculator;