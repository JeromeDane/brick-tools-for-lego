import React from 'react'
import {Image, View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import {Element} from '../../data/types'

type ElementPreviewProps = {
  element: Element,
  onPress: (elementId: string) => void
}

export default function ElementPreview({onPress, element: {id, part, color}}: ElementPreviewProps) {
  return <Card style={{marginBottom: 20}} onPress={() => onPress(id)}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <Image
        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${id}.jpg`}} />
      <View>
        <Paragraph>Part: {part.partNum} Element: {id}</Paragraph>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>{color.name} ({color.id})</Paragraph>
      </View>
    </Card.Content>
  </Card>
}
