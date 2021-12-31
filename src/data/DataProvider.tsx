import React, {useContext, createContext, useState} from 'react'

type DataContext = {
  isLoggedInToBrickset: boolean;
  setIsLoggedInToBrickset: (a: boolean) => void
}

const errorIfSetterNotReady = () => {
  console.error('Setter called before it was ready')
}

const DataContext = createContext({
  isLoggedInToBrickset: false,
  setIsLoggedInToBrickset: errorIfSetterNotReady
} as DataContext)

const DataProvider = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const [isLoggedInToBrickset, setIsLoggedInToBrickset] = useState(false)
  return <DataContext.Provider value={{
    isLoggedInToBrickset,
    setIsLoggedInToBrickset
  }}>
    {children}
  </DataContext.Provider>
}

export default DataProvider

export const useIsLoggedInToBrickset = () => useContext(DataContext).isLoggedInToBrickset
export const useSetIsLoggedInToBrickset = () => useContext(DataContext).setIsLoggedInToBrickset
