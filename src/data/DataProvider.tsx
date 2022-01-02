import React, {createContext, useState, SetStateAction, Dispatch} from 'react'
import {BricksetCollection, Elements, Parts, Sets} from './types'

const errorIfSetterNotReady = () => {
  console.error('Setter called before it was ready')
}

type DataContext = {
  bricksetCollection: BricksetCollection | null;
  setBricksetCollection: Dispatch<SetStateAction<BricksetCollection|null>>;
  elements: Elements | null,
  setElements: Dispatch<SetStateAction<Elements|null>>;
  isLoggedInToBrickset: boolean;
  setIsLoggedInToBrickset: Dispatch<SetStateAction<boolean>>;
  parts: Parts | null,
  setParts: Dispatch<SetStateAction<Parts|null>>,
  sets: Sets;
  setSets: Dispatch<SetStateAction<Sets>>;
}

export const DataContext = createContext({
  bricksetCollection: null,
  setBricksetCollection: errorIfSetterNotReady,
  elements: null,
  setElements: errorIfSetterNotReady,
  isLoggedInToBrickset: false,
  setIsLoggedInToBrickset: errorIfSetterNotReady,
  parts: null,
  setParts: errorIfSetterNotReady,
  sets: [],
  setSets: errorIfSetterNotReady
} as DataContext)

const DataProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const [isLoggedInToBrickset, setIsLoggedInToBrickset] = useState(false),
        [elements, setElements] = useState<Elements|null>(null),
        [sets, setSets] = useState([] as Sets),
        [bricksetCollection, setBricksetCollection] = useState<BricksetCollection|null>(null),
        [parts, setParts] = useState<Parts|null>(null)
  return <DataContext.Provider value={{
    bricksetCollection,
    setBricksetCollection,
    elements,
    setElements,
    isLoggedInToBrickset,
    setIsLoggedInToBrickset,
    parts,
    setParts,
    sets,
    setSets
  }}>
    {children}
  </DataContext.Provider>
}

export default DataProvider
