import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React from 'react';
import { ScrollView, Linking, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import ScaledImage from '../components/ScaledImage'
import { SetTabsParamList } from '../navigation/SetTabs'
import {useSets} from '../data/sets'
import { useIsLoggedIn } from '../api/brickset';
import TextLink from '../components/TextLink';

export default function SetDetailsScreen({ navigation, route: {params: {id}}}: MaterialTopTabScreenProps<SetTabsParamList, 'SetDetails'>) {
  const set = useSets().sets[id],
        isLoggedIn = useIsLoggedIn()
  return set
    ? <ScrollView style={{padding: 20}}>
      <ScaledImage
        width={500}
        source={{uri: set.image.imageURL}}
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
            ` at $${set.LEGOCom.US.retailPrice.toLocaleString()} USD`
            : ''
          }
        </Text>
        <Text>Owned by {set.ownedBy.toLocaleString()} people on Brickset</Text>
        <Text>Wanted by {set.wantedBy.toLocaleString()} people on Brickset</Text>
        {isLoggedIn
          ? <Text>You own {set.collection.qtyOwned.toLocaleString()}</Text>
          : <TextLink
            style={{marginTop: 10}}
            onPress={() => navigation.navigate('Settings')}>
            Log into Brickset to track how of this set many you own.
          </TextLink>
        }
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
