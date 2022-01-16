import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {Appearance} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import DataProvider from './data/DataProvider'
import {DefaultTheme, DarkTheme, Provider as PaperProvider} from 'react-native-paper'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation/Navigation'

require('intl')
require('intl/locale-data/jsonp/en.js')

export default function App() {
  const isLoadingComplete = useCachedResources(),
        colorScheme = useColorScheme(),
        theme = {
          ...(Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme)
        }

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
