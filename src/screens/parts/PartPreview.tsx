import React from 'react'
import {View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import ElementImage from '../../components/ElementImage'
import {useGetElementByPartAndColor} from '../../data/elements'
import {Part} from '../../data/types'

type PartPreviewProps = {
  defaultColorId: string;
  part: Part;
  onPress: (partNum: string) => void
}

const PartPreview = ({defaultColorId, part, onPress}: PartPreviewProps) => {
  const getElementByPartAndColor = useGetElementByPartAndColor(),
        defaultColor = part.colors && (part.colors.find(color => color && color.id == defaultColorId) || part.colors[0]),
        element = defaultColor && getElementByPartAndColor(part.partNum, defaultColor.id)
  return <Card style={{marginBottom: 20}} onPress={() => onPress(part.partNum)}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <ElementImage style={{marginRight: 10}} id={element?.id} width={100} />
      <View>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>Part Number: {part.partNum}</Paragraph>
        <Paragraph>Colors: {part.colors.length}</Paragraph>
      </View>
    </Card.Content>
  </Card>
}

export default PartPreview
