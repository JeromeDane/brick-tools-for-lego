import React from 'react'
import {Image, View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import {useGetElementByPartAndColor} from '../../data/elements'
import {Part} from '../../data/types'

type PartPreviewProps = {
  defaultColorId: string;
  part: Part;
  onPress: (partNum: string) => void
}

const PartPreview = ({defaultColorId, part, onPress}: PartPreviewProps) => {
  const getElementByPartAndColor = useGetElementByPartAndColor(),
        defaultColor = part.colors.find(({id}) => id == defaultColorId) || part.colors[0],
        element = defaultColor && getElementByPartAndColor(part.partNum, defaultColor.id)
  return <Card style={{marginBottom: 20}} onPress={() => onPress(part.partNum)}>
    <Card.Title title={part.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      {element &&
        <Image
          style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
          source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
      }
      <View>
        <Paragraph>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Paragraph>
        <Paragraph>Part Number: {part.partNum}</Paragraph>
        <Paragraph>Colors: {part.colors.length}</Paragraph>
      </View>
    </Card.Content>
  </Card>
}

export default PartPreview
