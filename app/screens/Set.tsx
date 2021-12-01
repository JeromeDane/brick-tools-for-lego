import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Image from '../components/Image'
import { RootTabScreenProps } from '../types'
import sets from '../data/sets.json'

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
        onLayout={({nativeEvent}) => {
          console.log(nativeEvent.layout.width)
          setViewWidth(nativeEvent.layout.width - 40)
        }}>
        {viewWidth
          ? <Image
            width={viewWidth}
            source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}}
            style={{marginBottom: 20}} />
          : null}
        <View>
          <Text>{set.setNum}</Text>
          <Text>{set.name}</Text>
          <Text>{set.numParts.toLocaleString()} parts</Text>
          <Text>Released in {set.year}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
