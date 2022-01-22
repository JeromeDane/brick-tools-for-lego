import React, {useEffect} from 'react'
import {ScrollView, Image, ActivityIndicator, View} from 'react-native'
import {RootStackScreenProps} from '../../navigation/types'
import {usePart} from '../../data/parts'
import {useGetElementByPartAndColor} from '../../data/elements'
import {Card, Headline, Paragraph} from 'react-native-paper'
import ElementPreview from './ElementPreview'

export default function Part({navigation}: RootStackScreenProps<'Part'>) {
  const {routes, index} = navigation.getState(),
        part = usePart(routes[index].params.id),
        getElementByPartAndColor = useGetElementByPartAndColor(),
        defaultColor = part.colors[0],
        element = defaultColor && getElementByPartAndColor(part.partNum, defaultColor.id)
  useEffect(() => {
    if(part) {
      navigation.setOptions({title: part.name})
    }
  }, [part])
  return <ScrollView style={{padding: 20}}>
    {part
      ? <View>
        <Image
          style={{marginBottom: 20, width: 192, height: 192, backgroundColor: 'gray'}}
          source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
        <Card style={{marginBottom: 20}}>
          <Card.Title title="Part Details" />
          <Card.Content>
            <Paragraph>Part Number: {part.partNum}</Paragraph>
            <Paragraph>Name: {part.name}</Paragraph>
            <Paragraph>Colors: {part.colors.length}</Paragraph>
          </Card.Content>
        </Card>
        <Headline style={{marginBottom: 20}}>Colors</Headline>
        {part.colors.map(color => {
          const element = getElementByPartAndColor(part.partNum, color.id)
          return <ElementPreview key={element.id} element={element} onPress={id => { navigation.navigate('Element', {id})}} />
        })}
      </View>
      : <ActivityIndicator color="#aaa" />
    }
  </ScrollView>
}