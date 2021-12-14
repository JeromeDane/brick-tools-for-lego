import React, { useEffect, useState } from 'react';
import { ScrollView, Linking, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import ScaledImage from '../components/ScaledImage'
import { RootTabScreenProps } from '../types'
import sets from '../data/raw/sets.json'
import themes from '../data/raw/themes-by-id.json'
import Inventory from '../components/Inventory'

export default function SetScreen({ navigation }: RootTabScreenProps<'Set'>) {
  const {routes, index} = navigation.getState(),
        [viewWidth, setViewWidth] = useState(0),
        set = sets.find(set => set.setNum === routes[index].params.id)
  useEffect(() => {
    navigation.setOptions({title: set.setNum + ' ' + set.name})
  }, [set])
  return (
    <View>
      <ScrollView style={{padding: 20}}
        onLayout={({nativeEvent}) =>
          setViewWidth(nativeEvent.layout.width - 40)
        }>
        <ScaledImage
          width={viewWidth}
          maxWidth={500}
          source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}}
          style={{marginBottom: 20}} />
        <View style={{marginBottom: 20}}>
          <Text>Set number: {set.setNum}</Text>
          <Text>Theme: {themes[set.themeId].name}</Text>
          <Text>{set.name}</Text>
          <Text>{set.numParts.toLocaleString()} parts</Text>
          <Text>Released in {set.year}</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Button onPress={() =>
            Linking.openURL('https://brickset.com/sets/' + set.setNum)
          } title="Brickset" />
        </View>
        <View style={{marginBottom: 20}}>
          <Button onPress={() =>
            Linking.openURL('https://rebrickable.com/sets/' + set.setNum)
          } title="Rebrickable" />
        </View>
        {set.inventories?.map((inventory: any) =>
          <Inventory id={inventory.id} key={inventory.id} />
        )}
      </ScrollView>
    </View>
  );
}
