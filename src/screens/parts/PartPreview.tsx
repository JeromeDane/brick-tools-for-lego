import React from 'react'
import {StyleSheet, Image, View} from 'react-native'
import {Text} from '../../components/Themed'
import {useGetElementByPartAndColor} from '../../data/elements'
import {Part} from '../../data/types'

type PartPreviewProps = {
  defaultColorId: string;
  part: Part;
}

const PartPreview = ({defaultColorId, part}: PartPreviewProps) => {
  const getElementByPartAndColor = useGetElementByPartAndColor(),
        defaultColor = part.colors.find(({id}) => id == defaultColorId) || part.colors[0],
        element = defaultColor && getElementByPartAndColor(part.partNum, defaultColor.id)
  return <View style={styles.part}>
    {element &&
      <Image
        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
    }
    <View>
      <Text>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Text>
      <Text>{part.name}</Text>
      <Text>Part Number: {part.partNum}</Text>
      <Text>Colors: {part.colors.length}</Text>
    </View>
  </View>
}

export default PartPreview

const styles = StyleSheet.create({
  part: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    paddingVertical: 10,
    paddingRight: 20,
    flexGrow: 1
  },
  image: {
    backgroundColor: 'gray',
    marginRight: 10
  }
})
