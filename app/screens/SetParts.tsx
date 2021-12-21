import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { SetTabsParamList } from '../types'
import sets from '../data/raw/sets.json'
import Inventory from '../components/Inventory'
import inventoryParts from '../data/inventory-parts'

export default function SetPartsScreen({ navigation }: SetTabsParamList<'Set'>) {
  const {routes, index} = navigation.getState(),
        id = routes[index].params.id,
        set = sets.find(set => set.setNum === id),
        inventory = set && set.inventories && set.inventories[0],
        numParts = ((inventory && inventoryParts[inventory.id]) || [])
          .reduce((count, inventoryPart) => count + inventoryPart.quantity, 0)
  useEffect(() => {
    navigation.setOptions({
      title: `Parts (${numParts.toLocaleString()})`
    })
  }, [set])
  return (
    <View>
      <ScrollView style={{padding: 20}}>
        {inventory
          ? <Inventory id={inventory.id} navigation={navigation} />
          : <Text>Unable to find inventory set number "{id}"</Text>
        }
      </ScrollView>
    </View>
  );
}
