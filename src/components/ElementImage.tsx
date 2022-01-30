import React from 'react'
import {ImageStyle, StyleProp, View} from 'react-native'
import ScaledImage from './ScaledImage'

type ElementImageProps = {
  id?: string,
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
}

export default function ElementImage({id, width, height, style}: ElementImageProps) {
  return <View>
    <ScaledImage
      width={width}
      height={height}
      style={style}
      source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod${elementLODVersion[id] || 5}photo.192x192/${id}.jpg`}} />
  </View>
}

const elementLODVersion = {
  '4541679': 4
}
