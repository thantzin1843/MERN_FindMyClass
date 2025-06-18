import {  createContext, useContext, useState } from "react";

const InstituteSignUpContext = createContext();

export const InstituteSignUpContextProvider = ({children}) =>{
    const [data, setData] = useState({})
    const updateData = (newData) =>{
        setData((prev)=>(
            {...prev,...newData}
        ))
    }
    return(
        <InstituteSignUpContext.Provider value={{data,updateData}}>
            {children}
        </InstituteSignUpContext.Provider>
    )
}

export const useInstituteSignUpContext = () =>useContext(InstituteSignUpContext)
