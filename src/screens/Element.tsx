import React, {useEffect} from 'react'
import {ScrollView, Image, Button, Linking, ActivityIndicator} from 'react-native'
import {RootStackScreenProps} from '../navigation/types'
import {Text, View} from '../components/Themed'
import {useElement} from '../data/elements'
import colors from '../data/colors'

export default function Element({navigation}: RootStackScreenProps<'Element'>) {
  const {routes, index} = navigation.getState(),
        element = useElement(routes[index].params.id)
  useEffect(() => {
    if(element) {
      navigation.setOptions({
        title: `${element.part.name} (${element.color.name})`
      })
    }
  }, [element])
  return <ScrollView style={{padding: 20}}>
    {element
      ? <View>
        <Image
          style={{marginBottom: 20, width: 192, height: 192, backgroundColor: 'gray'}}
          source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
        <Text>Element ID: {element.id}</Text>
        <Text>Part Number: {element.part.partNum}</Text>
        <Text>Name: {element.part.name}</Text>
        <Text>Color: {element.color.name}</Text>
        <View style={{marginTop: 20}}>
          <Button title="Brickset" onPress={() =>
            Linking.openURL(`https://brickset.com/parts/${element.id}/`)
          } />
        </View>
        <View style={{marginTop: 20}}>
          <Button title="BrickLink" onPress={() =>
            Linking.openURL(`https://www.bricklink.com/v2/catalog/catalogitem.page?P=${element.part.partNum}&idColor=` + colors[element.color.id].brickLink.id)
          } />
        </View>
      </View>
      : <ActivityIndicator color="#aaa" />
    }
  </ScrollView>
}
