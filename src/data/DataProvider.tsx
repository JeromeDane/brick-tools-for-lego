import React, {createContext, useState, SetStateAction, Dispatch} from 'react'
import {BricksetCollection, Sets} from './types'

const errorIfSetterNotReady = () => {
  console.error('Setter called before it was ready')
}

type DataContext = {
  bricksetCollection: BricksetCollection | null;
  setBricksetCollection: React.Dispatch<React.SetStateAction<BricksetCollection>>;
  isLoggedInToBrickset: boolean;
  setIsLoggedInToBrickset: Dispatch<SetStateAction<boolean>>;
  sets: Sets;
  setSets: Dispatch<SetStateAction<Sets>>;
}

export const DataContext = createContext({
  bricksetCollection: null,
  setBricksetCollection: errorIfSetterNotReady,
  isLoggedInToBrickset: false,
  setIsLoggedInToBrickset: errorIfSetterNotReady,
  sets: [],
  setSets: errorIfSetterNotReady
} as DataContext)

const DataProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const [isLoggedInToBrickset, setIsLoggedInToBrickset] = useState(false),
        [sets, setSets] = useState([] as Sets),
        [bricksetCollection, setBricksetCollection] = useState({} as BricksetCollection)
  return <DataContext.Provider value={{
    bricksetCollection,
    setBricksetCollection,
    isLoggedInToBrickset,
    setIsLoggedInToBrickset,
    sets,
    setSets
  }}>
    {children}
  </DataContext.Provider>
}

export default DataProvider
