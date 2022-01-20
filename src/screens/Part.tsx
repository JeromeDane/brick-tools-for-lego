import React, {useEffect} from 'react'
import {ScrollView, Image, ActivityIndicator, View} from 'react-native'
import {RootStackScreenProps} from '../navigation/types'
import {Text} from '../components/Themed'
import {usePart} from '../data/parts'
import {useGetElementByPartAndColor} from '../data/elements'
import { Card } from 'react-native-paper'

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
        <Card>
          <Card.Title title="Part Details" />
          <Card.Content>
            <Text>Part Number: {part.partNum}</Text>
            <Text>Name: {part.name}</Text>
            <Text>Colors: {part.colors.length}</Text>
          </Card.Content>
        </Card>
      </View>
      : <ActivityIndicator color="#aaa" />
    }
  </ScrollView>
}
