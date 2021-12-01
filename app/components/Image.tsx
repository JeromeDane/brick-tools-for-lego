import React, {useEffect, useState} from 'react';
import { Image as DefaultImage } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type DefaultImageProps = React.ComponentProps<typeof DefaultImage>
interface ImageProps extends DefaultImageProps {
  source: {uri: string}
}

const Image = (props: ImageProps) => {
  const { style, ...otherProps } = props,
        [imageWidth, setImageWidth] = useState(props.width || 100),
        [imageHeight, setImageHeight] = useState(props.height || 100)
  useEffect(() => {
    DefaultImage.getSize(props.source.uri, (width, height) => {
      if (props.width && !props.height)
        setImageHeight(height * (props.width / width))
      else if (!props.width && props.height)
        setImageWidth(width * (props.height / height))
    })
  }, [])
  return <DefaultImage style={[{
    backgroundColor: Colors[useColorScheme()].background,
    width: imageWidth,
    height: imageHeight
  }, style]} {...otherProps} />
}

export default Image