import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React from 'react'
import {View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import ElementImage from '../../../components/ElementImage'
import TextLink from '../../../components/TextLink'
import {useGetElementByPartAndColor} from '../../../data/elements'
import {InventoryPart} from '../../../data/types'
import {RootStackParamList} from '../../../navigation/types'

type SetPartPreviewProps = {
  inventortPart: InventoryPart,
  onPress: () => void,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Set'>
}

export default function SetPartPreview({navigation, onPress, inventortPart: {part, color, isSpare, quantity}}: SetPartPreviewProps) {
  const getElementByPartAndColor = useGetElementByPartAndColor(),
        element = getElementByPartAndColor(part.partNum, color.id)
  return <Card style={{marginBottom: 20}}
    onPress={onPress}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <ElementImage id={element?.id} style={{marginRight: 10}} width={100} />
      <View>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>Element: {element?.id || '?'}</Paragraph>
        <Paragraph>
          Part:{' '}
          <TextLink onPress={() => navigation.navigate('Part', {id: part.partNum})}>
            {part.partNum}
          </TextLink>
        </Paragraph>
        <Paragraph>{color.name} ({color.id})</Paragraph>
        <Paragraph>Qty: {quantity}{isSpare ? ' (spare part)' : ''}</Paragraph>
        <Paragraph>
          Sets: {element?.setNumbers?.length}
        </Paragraph>
      </View>
    </Card.Content>
  </Card>
}
