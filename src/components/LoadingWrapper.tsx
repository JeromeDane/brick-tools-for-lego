import React, {useEffect, useState} from 'react'
import {ActivityIndicator, View} from 'react-native'

const LoadingWrapper = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if(isLoading) setIsLoading(false)
  }, [isLoading])
  return <View>
    {isLoading
      ? <ActivityIndicator color="#aaa" />
      : children
    }
  </View>
}

export default LoadingWrapper
