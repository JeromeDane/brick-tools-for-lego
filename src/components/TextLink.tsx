import * as React from 'react'
import {Linking} from 'react-native'
import {useTheme} from 'react-native-paper'
import {Text, TextProps} from './Themed'

interface TextLinkProps extends TextProps {
  url?: string
}

const TextLink = (props: TextLinkProps) => {
  const theme = useTheme()
  return <Text
    {...Object.assign({}, props,
      props.url ? {onPress: () => Linking.openURL(props.url!)} : {}
    )}
    style={[props.style, {color: theme.colors.primary}]} />
}

export default TextLink
