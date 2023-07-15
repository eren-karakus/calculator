import { useContext } from "react";
import { OpsAndEntryContext } from "../App";

function OperationButton(props) {
    const { opsArray, setOpsArray, currEntry, setCurrEntry, isNewEntryExpected, setNewEntryExpected } = useContext(OpsAndEntryContext);
    let newOpsArray = [...opsArray];
    let lastElement = opsArray[opsArray.length - 1];
    const currEntryFloat = parseFloat(currEntry);

    return (
        <>
            <button {...props} onClick={e => {
                // When an operation button (with values "+", "-", "/", "*", or "=") is clicked 

                if (isNewEntryExpected) { // right after "+", "-", "/", "*", or "=" is clicked
                    if (e.target.value === '=') {
                        if (typeof lastElement === 'number') {
                            newOpsArray = [currEntryFloat, '='];
                            setOpsArray(newOpsArray);
                            setCurrEntry(currEntry);
                        } else if (["+", "-", "/", "*"].includes(lastElement)) {
                            newOpsArray.push(currEntryFloat);// push the current entry

                            let result = calculateResult(newOpsArray); // calculate the result
                            setCurrEntry(result.toString());        // show it as the entry
                            setNewEntryExpected(true);              // so that entry is cleaned when a number button is clicked

                            newOpsArray.push(props.value);          // push '='
                            setOpsArray(newOpsArray);
                        } else if (lastElement === "=") {           // the case when '=' was clicked and result is shown
                            if (newOpsArray.length > 3) {
                                newOpsArray = newOpsArray.slice(-3);       // get the last operation, number, and '='
                                newOpsArray.unshift(currEntryFloat) // add the result to the beginning of the array
                            } else {
                                newOpsArray.length = 0;
                                newOpsArray.push(currEntryFloat, '=');
                            }
                            
                            let result = calculateResult(newOpsArray); // calculate the result
                            setCurrEntry(result.toString());        // show it as the entry
                            setNewEntryExpected(true);              // so that entry is cleaned when a number button is clicked

                            setOpsArray(newOpsArray);
                        }
                    } else { // e.target.value == "+", "-", "/", or "*"
                        if (typeof lastElement === 'number') { // never the case
                            throw new Error("Error in calculator! 2");
                        } else if (["+", "-", "/", "*"].includes(lastElement)) {
                            newOpsArray.pop(); // pop the previously specified operation
                            newOpsArray.push(props.value);
                            setOpsArray(newOpsArray);
                        } else if (lastElement === "=") {
                            newOpsArray.length = 0;                 // empty the array
                            newOpsArray.push(currEntryFloat);// push the current entry
                            newOpsArray.push(props.value);          // push the operation
                            setOpsArray(newOpsArray);
                        }
                    }
                } else { // isNewEntryExpected is false
                    if (e.target.value === '=') {
                        if (typeof lastElement === 'number') {
                            newOpsArray.length = 0;                 // empty the array
                            newOpsArray.push(currEntryFloat);// push the current entry
                            newOpsArray.push(props.value);          // push the operation
                            setOpsArray(newOpsArray);
                        } else if (["+", "-", "/", "*"].includes(lastElement)) {
                            newOpsArray.push(currEntryFloat);

                            let result = calculateResult(newOpsArray); // calculate the result
                            setCurrEntry(result.toString());        // show it as the entry
                            setNewEntryExpected(true);              // so that entry is cleaned when a number button is clicked

                            newOpsArray.push(props.value);
                            setOpsArray(newOpsArray);
                        } else if (lastElement === "=") {
                            newOpsArray = [0];
                            setOpsArray(newOpsArray);
                        }
                    } else { // e.target.value == "+", "-", "/", or "*"
                        if (typeof lastElement === 'number') {
                            newOpsArray.pop();
                            newOpsArray.push(currEntryFloat);
                            newOpsArray.push(props.value);
                            setOpsArray(newOpsArray);
                        } else if (["+", "-", "/", "*"].includes(lastElement)){ // consecutive operations
                            newOpsArray.push(currEntryFloat);
                            setOpsArray(newOpsArray);
                            console.log(newOpsArray);
                            let result = calculateResult(newOpsArray); // calculate the result
                            
                            setCurrEntry(result.toString());        // show it as the entry
                            setNewEntryExpected(true);              // so that entry is cleaned when a number button is clicked

                            newOpsArray.push(props.value);
                        } else if (lastElement === "=") {
                            newOpsArray = [currEntryFloat, props.value];
                            setOpsArray(newOpsArray);
                            setNewEntryExpected(true);
                        } else {
                        }
                    }
                }

                setNewEntryExpected(true);

            }}>{props.children}</button>    
        </>
    );
}

function calculateResult(opsArray) {
    let revPolish = toReversePolishNotation(opsArray);
    let tempStack = [];

    for (let i = 0; i < revPolish.length; i++) {
        const element = revPolish[i];
        
        if (typeof element === 'number') {
            tempStack.push(element);
            continue;
        } else {
            let first = tempStack.pop();
            let second = tempStack.pop();
            if (element === '+') {
                tempStack.push(second + first);
            } else if (element === '-') {
                tempStack.push(second - first);
            } else if (element === '*') {
                tempStack.push(second * first);
            } else if (element === '/') {
                tempStack.push(second / first);
            }
        }
    }
    return tempStack.pop();
}

function toReversePolishNotation(array) {
    let finalQueue = [];
    let tempStack = [];
    tempStack.peek = () => { return tempStack[tempStack.length-1] };

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (typeof element === 'number') {
            finalQueue.push(element);
            continue;
        } else if (element === '+' || element === '-') {
            if (tempStack.peek() === '/' || tempStack.peek() === '*') {
                finalQueue.push(tempStack.pop());
                tempStack.push(element);
                continue;
            } else {
                tempStack.push(element);
            }
        } else if (element === '=') {
            continue;
        } else {
            tempStack.push(element);
        }
    }
    while (tempStack.length !== 0) {
        finalQueue.push(tempStack.pop());
    }
    return finalQueue;
}

export default OperationButton;