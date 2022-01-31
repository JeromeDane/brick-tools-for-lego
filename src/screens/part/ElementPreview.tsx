import React from 'react'
import {View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import type {Color} from '../../data/colors'
import type {Part} from '../../data/types'
import {useGetElementByPartAndColor} from '../../data/elements'
import ElementImage from '../../components/ElementImage'

type ElementPreviewProps = {
  part: Part;
  color?: Color;
  onPress: () => void;
}

export default function ElementPreview({onPress, part, color}: ElementPreviewProps) {
  const getElementByPartAndColor = useGetElementByPartAndColor(),
        element = getElementByPartAndColor(part.partNum, color?.id),
        {id, setNumbers} = element || {}
  return <Card style={{marginBottom: 20}} onPress={() => onPress()}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <ElementImage id={id} width={100} style={{marginRight: 10}} />
      <View>
        <Paragraph>Part: {part.partNum} Element: {id}</Paragraph>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>{color?.name} ({color?.id})</Paragraph>
        <Paragraph>Sets: {setNumbers?.length.toLocaleString()}</Paragraph>
      </View>
    </Card.Content>
  </Card>
}
