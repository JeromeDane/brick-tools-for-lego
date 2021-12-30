import * as React from 'react'
import {Linking} from 'react-native'

import {Text, TextProps} from './Themed'

interface TextLinkProps extends TextProps {
  url?: string
}

const TextLink = (props: TextLinkProps) => {
  return <Text
    {...Object.assign({}, props,
      props.url ? {onPress: () => Linking.openURL(props.url!)} : {}
    )}
    style={[props.style, {color: '#2e78b7'}]} />
}

export default TextLink
