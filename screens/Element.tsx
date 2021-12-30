import React, {useEffect} from 'react'
import {ScrollView, Image, Button, Linking} from 'react-native'
import {RootStackScreenProps} from '../navigation/types'
import {Text, View} from '../components/Themed'
import {elements} from '../data/elements'
import colors from '../data/colors'

export default function Element({navigation}: RootStackScreenProps<'Element'>) {
  const {routes, index} = navigation.getState(),
        element = elements[routes[index].params.id],
        {id, part, color} = element
  useEffect(() => {
    navigation.setOptions({
      title: `${part.name} (${color.name})`
    })
  }, [element])
  return (
    <View>
      <ScrollView style={{padding: 20}}>
        <Image
          style={{marginBottom: 20, width: 192, height: 192, backgroundColor: 'gray'}}
          source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${id}.jpg`}} />
        <Text>Element ID: {id}</Text>
        <Text>Part Number: {part.partNum}</Text>
        <Text>Name: {part.name}</Text>
        <Text>Color: {color.name}</Text>
        <View style={{marginTop: 20}}>
          <Button title="Brickset" onPress={() =>
            Linking.openURL(`https://brickset.com/parts/${id}/`)
          } />
        </View>
        <View style={{marginTop: 20}}>
          <Button title="BrickLink" onPress={() =>
            Linking.openURL(`https://www.bricklink.com/v2/catalog/catalogitem.page?P=${part.partNum}&idColor=` + colors[color.id].brickLink.id)
          } />
        </View>
      </ScrollView>
    </View>
  )
}
