import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {BricksetAPIProvider} from './api/brickset'
import DataProvider from './data/DataProvider'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation/Navigation'

require('intl')
require('intl/locale-data/jsonp/en.js')

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if(!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <DataProvider>
          <BricksetAPIProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </BricksetAPIProvider>
        </DataProvider>
      </SafeAreaProvider>
    )
  }
}
