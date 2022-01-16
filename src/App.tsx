import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import DataProvider from './data/DataProvider'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation/Navigation'

require('intl')
require('intl/locale-data/jsonp/en.js')

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow'
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if(!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <DataProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </DataProvider>
        </PaperProvider>
      </SafeAreaProvider>
    )
  }
}
