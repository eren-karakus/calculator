import { useContext } from "react";
import { OpsAndEntryContext } from "../App";

function NumberButton(props) {
    const { currEntry, setCurrEntry, isNewEntryExpected, setNewEntryExpected, opsArray, setOpsArray } = useContext(OpsAndEntryContext);
    return (
        <>
            <button {...props} onClick={() => {
                if (currEntry === '0') {
                    setCurrEntry(props.value);
                } else {
                    if (isNewEntryExpected) {
                        if (opsArray[opsArray.length - 1] === '=') {
                            setOpsArray([0])
                        }
                        setCurrEntry(props.value);
                    } else {
                        setCurrEntry(currEntry.concat(props.value));
                    }
                }
                
                setNewEntryExpected(false);

            }}>{props.children}</button>    
        </>
    );
}

export default NumberButton;