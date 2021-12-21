import React, { useEffect, useState } from 'react';
import { ScrollView, Image, Button, Linking } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types'
import { elements } from '../data/elements'

export default function Element({ navigation }: RootStackParamList<'Element'>) {
  const {routes, index} = navigation.getState(),
        [viewWidth, setViewWidth] = useState(0),
        element = elements[routes[index].params.id],
        {id, part, color} = element
  useEffect(() => {
    navigation.setOptions({title: element.part.name})
  }, [element])
  return (
    <View>
      <ScrollView style={{padding: 20}}>
        <Image
          style={{marginBottom: 20, width: 192, height: 192, backgroundColor: 'gray'}}
          source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${id}.jpg`}} />
        <Text>Element ID: {element.id}</Text>
        <Text>Part Number: {element.part.partNum}</Text>
        <Text>Name: {element.part.name}</Text>
        <Button title="BrickLink" onPress={() =>
          Linking.openURL(`https://www.bricklink.com/v2/catalog/catalogitem.page?P=${part.partNum}&idColor=11`)
        } />
      </ScrollView>
    </View>
  );
}
