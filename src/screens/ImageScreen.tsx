import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView'
import ScaledImage from '../components/ScaledImage'
import {RootStackScreenProps} from '../navigation/types'

export default function ImageScreen({navigation}: RootStackScreenProps<'Image'>) {
  const {routes, index} = navigation.getState(),
        {url, title} = routes[index].params as {url: string, title: string},
        [width, setWidth] = useState(0)
  useEffect(() => {
    navigation.setOptions({title})
  }, [])
  return <View onLayout={e => setWidth(e.nativeEvent.layout.width)} style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    {width
      ? <ReactNativeZoomableView
        minZoom={1}
        zoomStep={0.5}
        maxZoom={5}
        initialZoom={1}
        bindToBorders={true}>
        <ScaledImage width={width} source={{uri: url}} />
      </ReactNativeZoomableView>
      : null
    }
  </View>
}
