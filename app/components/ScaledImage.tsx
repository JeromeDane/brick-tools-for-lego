import React, {useEffect, useState} from 'react';
import { Image as DefaultImage } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type DefaultImageProps = React.ComponentProps<typeof DefaultImage>
interface ImageProps extends DefaultImageProps {
  source: {uri: string},
  maxWidth?: number,
  maxHeight?: number
}

const ScaledImage = (props: ImageProps) => {
  const { style, ...otherProps } = props,
        [width, setImageWidth] = useState(props.width || 100),
        [height, setImageHeight] = useState(props.height || 100)
  useEffect(() => {
    DefaultImage.getSize(props.source.uri, (w, h) => {
      if(props.width && !props.height) {
        const newWidth = Math.min(props.width, props.maxWidth || Number.POSITIVE_INFINITY)
        setImageHeight(h * (newWidth / w))
        setImageWidth(newWidth)
      } else if(!props.width && props.height) {
        const newHeight = Math.min(props.height, props.maxHeight || Number.POSITIVE_INFINITY)
        setImageHeight(newHeight)
        setImageWidth(w * (newHeight / h))
      }
    })
  }, [props.width, props.height])
  return <DefaultImage style={[{
    backgroundColor: Colors[useColorScheme()].background,
    width,
    height
  }, style]} {...otherProps} />
}

export default ScaledImage