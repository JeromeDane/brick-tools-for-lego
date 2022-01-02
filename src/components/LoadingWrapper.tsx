import React, {useEffect, useState} from 'react'
import {ActivityIndicator, View} from 'react-native'

type LoadingWrapperProps = {
  children: JSX.Element[] | JSX.Element,
  loading?: boolean
}

const LoadingWrapper = ({children, loading}: LoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if(isLoading) setIsLoading(false)
  }, [isLoading])
  return <View>
    {(isLoading || loading)
      ? <ActivityIndicator color="#aaa" />
      : children
    }
  </View>
}

export default LoadingWrapper
