import { useReducer } from "react"
import { Digimon } from "../types"

const INITIAL_STATE = {
    img: '',
    level: '',
    name: ''
}

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} 

interface FormState {
    inputValues: Digimon
}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case "change_value":
            const {inputName, inputValue} = action.payload
            return{
                ...state,
                [inputName]: inputValue
            }
    
        
    }
}
const useNewDPForm = () => {
    return useReducer(formReducer,INITIAL_STATE)
}
export default useNewDPForm