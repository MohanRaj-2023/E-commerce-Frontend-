import { createContext, useContext, useState } from 'react'

const FilterContext = createContext()


export const FilterProvider = ({children})=>{
    const [filters,setFilters] = useState({
        "price" : " ",
        "rating": " ",
        "trending":false,
        "gender":[],
        "size":[],
        "color":[],
    });

    const updatefilter = (key,value)=>{
        setFilters((prev)=>{
            if(key==='gender'){
                    return{
                        ...prev,
                        gender:prev.gender.includes(value)?
                        prev.gender.filter((s)=>s!==value):
                        [...prev.gender,value]    
                    }
            }else if(key==='size'){
                return{
                    ...prev,
                    size:prev.size.includes(value)?
                    prev.size.filter((s)=>s!==value):
                    [...prev.size,value]    
                }
            }else if(key==='color'){
                return{
                    ...prev,
                    color:prev.color.includes(value)?
                    prev.color.filter((c)=>c!==value):
                    [...prev.color,value]
                }
            }
            else{
                return {...prev,[key]:value}    
            }
            
        });
            
        
    }

    return (
        <FilterContext.Provider value={{filters,updatefilter}} >
                    {children}
        </FilterContext.Provider>
    )
}


export const useFilter = () => useContext(FilterContext)