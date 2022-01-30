import React, {useMemo, useState} from 'react'
import {ActivityIndicator, Image, View} from 'react-native'

interface ImageProps extends React.ComponentProps<typeof Image> {
  source: {uri: string};
  maxWidth?: number;
  maxHeight?: number;
  width?: number;
  height?: number;
  onPress?: () => void,
  style?: any; // TODO: type this properly
}

const ScaledImage = (props: ImageProps) => {
  const [retryCounter, setRetryCounter] = useState(0),
        seed = useMemo(() => Math.random(), []),
        [loaded, setLoaded] = useState(false),
        width = props.width || props.height || props.style?.width || props.style?.height || 0,
        height = props.height || props.width || props.style?.height || props.style?.width || 0
  return <View
    style={[
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width,
        height,
        position: 'relative'
      },
      props.style
    ]}>
    {!loaded
      ? <ActivityIndicator color='#aaaa' style={{marginTop: (width || 0) / 2 - 10}} />
      : null
    }
    <Image
      key={`image-${retryCounter}-${seed}`}
      source={props.source}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if(retryCounter < 1000) setRetryCounter(c => c + 1)
      }}
      style={{flex: 1, width, height, resizeMode: 'contain'}} />
  </View>
}

export default ScaledImage
