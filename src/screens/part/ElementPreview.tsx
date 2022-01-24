import React from 'react'
import {Image, View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import type {Color} from '../../data/colors'
import type {Part} from '../../data/types'
import {useGetElementByPartAndColor} from '../../data/elements'

type ElementPreviewProps = {
  part: Part;
  color: Color;
  onPress: () => void;
}

export default function ElementPreview({onPress, part, color}: ElementPreviewProps) {
  const getElementByPartAndColor = useGetElementByPartAndColor(),
        {id, setNumbers} = getElementByPartAndColor(part.partNum, color.id)
  return <Card style={{marginBottom: 20}} onPress={() => onPress()}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <Image
        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${id}.jpg`}} />
      <View>
        <Paragraph>Part: {part.partNum} Element: {id}</Paragraph>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>{color.name} ({color.id})</Paragraph>
        <Paragraph>Sets: {setNumbers.length.toLocaleString()}</Paragraph>
      </View>
    </Card.Content>
  </Card>
}
