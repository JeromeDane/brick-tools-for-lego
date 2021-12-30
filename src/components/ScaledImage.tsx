import React, {useEffect, useState} from 'react'
import {Image as DefaultImage} from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

type DefaultImageProps = React.ComponentProps<typeof DefaultImage>
interface ImageProps extends DefaultImageProps {
  source: {uri: string},
  maxWidth?: number,
  maxHeight?: number
}

const ScaledImage = (props: ImageProps) => {
  const {style, ...otherProps} = props,
        [[width, height], setImageSize] = useState([props.width || 100, props.height || 100])
  useEffect(() => {
    DefaultImage.getSize(props.source.uri, (w, h) => {
      if(props.width && !props.height) {
        const newWidth = Math.min(props.width, props.maxWidth || Number.POSITIVE_INFINITY)
        setImageSize([newWidth, h * (newWidth / w)])
      } else if(!props.width && props.height) {
        const newHeight = Math.min(props.height, props.maxHeight || Number.POSITIVE_INFINITY)
        setImageSize([w * (newHeight / h), newHeight])
      }
    })
  }, [])
  return <DefaultImage style={[{
    backgroundColor: Colors[useColorScheme()].background,
    width,
    height
  },
  style]} {...otherProps} />
}

export default ScaledImage
