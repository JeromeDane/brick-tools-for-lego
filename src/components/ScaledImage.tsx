import React, {useMemo, useState} from 'react'
import {ActivityIndicator, Image, ImageStyle, StyleProp, TouchableOpacity, View} from 'react-native'

interface ImageProps extends React.ComponentProps<typeof Image> {
  source: {uri: string};
  maxWidth?: number;
  maxHeight?: number;
  width?: number;
  height?: number;
  onPress?: () => void,
  style?: StyleProp<ImageStyle>;
}

const ScaledImage = (props: ImageProps) => {
  const [retryCounter, setRetryCounter] = useState(0),
        seed = useMemo(() => Math.random(), []),
        [loaded, setLoaded] = useState(false),
        width = props.width || props.height || 0,
        height = props.height || props.width || 0,
        containerStyle = [
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
        ],
        Container = useMemo(() => props.onPress
          ? ({children}: React.ComponentProps<typeof TouchableOpacity>) =>
            <TouchableOpacity onPress={props.onPress} style={containerStyle}>
              {children}
            </TouchableOpacity>
          : ({children}: React.ComponentProps<typeof View>) =>
            <View style={containerStyle}>{children}</View>
        , [])
  return <Container>
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
  </Container>
}

export default ScaledImage
