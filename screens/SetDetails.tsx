import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React from 'react';
import { ScrollView, Linking, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import ScaledImage from '../components/ScaledImage'
import { SetTabsParamList } from '../navigation/SetTabs'
import sets from '../data/sets'

export default function SetDetailsScreen({ route: {params: {id}}}: MaterialTopTabScreenProps<SetTabsParamList, 'SetDetails'>) {
  const set = sets[id]
  return set
    ? <ScrollView style={{padding: 20}}>
      <ScaledImage
        width={500}
        source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}}
        style={{marginBottom: 20}} />
      <View style={{marginBottom: 20}}>
        <Text>Set number: {set.setNum}</Text>
        <Text>Theme: {set.theme.name}</Text>
        <Text>{set.name}</Text>
        <Text>
          {set.numParts.toLocaleString()} parts
          {set.LEGOCom.US.retailPrice ?
            ` - $${(set.LEGOCom.US.retailPrice / set.numParts).toFixed(2)} USD per part`
            : ''
          }
        </Text>
        <Text>
          Released in {set.year}
          {set.LEGOCom.US.retailPrice ?
            ` - $${set.LEGOCom.US.retailPrice.toLocaleString()} USD`
            : ''
          }
        </Text>
        <Text>Owned by {set.ownedBy.toLocaleString()} people on Brickset</Text>
        <Text>Wanted by {set.wantedBy.toLocaleString()} people on Brickset</Text>
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
    </ScrollView>
    : <Text>Unable to find set number "{id}"</Text>
}
