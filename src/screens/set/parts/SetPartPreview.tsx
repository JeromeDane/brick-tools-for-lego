import React from 'react'
import {Image, View} from 'react-native'
import {Card} from 'react-native-paper'
import {Text} from '../../../components/Themed'
import {InventoryPart} from '../../../data/types'

type SetPartPreviewProps = {
  inventortPart: InventoryPart,
  onPress: (elementId: string) => void
}

export default function SetPartPreview({onPress, inventortPart: {part, color, isSpare, quantity, element}}: SetPartPreviewProps) {
  return <Card style={{marginBottom: 20}}
    onPress={() => onPress(element.id)}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <Image
        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
      <View>
        <Text>Part: {part.partNum} Element: {element.id}</Text>
        <Text>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Text>
        <Text>{color.name} ({color.id})</Text>
        <Text>Qty: {quantity}{isSpare ? ' (spare part)' : ''}</Text>
      </View>
    </Card.Content>
  </Card>
}
