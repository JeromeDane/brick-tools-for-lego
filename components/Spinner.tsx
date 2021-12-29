import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'

export default ({visible, textContent = 'Loading ...'}: {visible: boolean, textContent?: string}) => {
  const theme = useColorScheme(),
        color = Colors[theme].text
  return <Spinner
    visible={visible}
    textContent={textContent}
    color={color}
    overlayColor="rgba(0,0,0,.8)"
    textStyle={{color}} />
}