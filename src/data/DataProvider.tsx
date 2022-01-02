import React, {createContext, useState, SetStateAction, Dispatch} from 'react'
import {BricksetCollection, Parts, Sets} from './types'

const errorIfSetterNotReady = () => {
  console.error('Setter called before it was ready')
}

type DataContext = {
  bricksetCollection: BricksetCollection | null;
  setBricksetCollection: React.Dispatch<React.SetStateAction<BricksetCollection|null>>;
  isLoggedInToBrickset: boolean;
  setIsLoggedInToBrickset: Dispatch<SetStateAction<boolean>>;
  parts: Parts | null,
  setParts: React.Dispatch<React.SetStateAction<Parts|null>>,
  sets: Sets;
  setSets: Dispatch<SetStateAction<Sets>>;
}

export const DataContext = createContext({
  bricksetCollection: null,
  setBricksetCollection: errorIfSetterNotReady,
  isLoggedInToBrickset: false,
  setIsLoggedInToBrickset: errorIfSetterNotReady,
  parts: null,
  setParts: errorIfSetterNotReady,
  sets: [],
  setSets: errorIfSetterNotReady
} as DataContext)

const DataProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const [isLoggedInToBrickset, setIsLoggedInToBrickset] = useState(false),
        [sets, setSets] = useState([] as Sets),
        [bricksetCollection, setBricksetCollection] = useState<BricksetCollection|null>(null),
        [parts, setParts] = useState<Parts|null>(null)
  return <DataContext.Provider value={{
    bricksetCollection,
    setBricksetCollection,
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
