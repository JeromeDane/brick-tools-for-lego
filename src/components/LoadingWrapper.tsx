import React, {useEffect, useState} from 'react'
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native'

type LoadingWrapperProps = {
  children: JSX.Element[] | JSX.Element,
  loading?: boolean,
  style?: StyleProp<ViewStyle>
}

const LoadingWrapper = ({children, loading, style = {}}: LoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if(isLoading) setIsLoading(false)
  }, [isLoading])
  return <View>
    {(isLoading || loading)
      ? <ActivityIndicator style={style} color="#aaa" />
      : children
    }
  </View>
}

export default LoadingWrapper
