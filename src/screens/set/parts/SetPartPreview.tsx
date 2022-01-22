import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React from 'react'
import {Image, View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import TextLink from '../../../components/TextLink'
import {InventoryPart} from '../../../data/types'
import {RootStackParamList} from '../../../navigation/types'

type SetPartPreviewProps = {
  inventortPart: InventoryPart,
  onPress: (elementId: string) => void,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Set'>
}

export default function SetPartPreview({navigation, onPress, inventortPart: {part, color, isSpare, quantity, element}}: SetPartPreviewProps) {
  return <Card style={{marginBottom: 20}}
    onPress={() => onPress(element.id)}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <Image
        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
      <View>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>Element: {element.id}</Paragraph>
        <Paragraph>
          Part:{' '}
          <TextLink onPress={() => navigation.navigate('Part', {id: part.partNum})}>
            {part.partNum}
          </TextLink>
        </Paragraph>
        <Paragraph>{color.name} ({color.id})</Paragraph>
        <Paragraph>Qty: {quantity}{isSpare ? ' (spare part)' : ''}</Paragraph>
      </View>
    </Card.Content>
  </Card>
}
