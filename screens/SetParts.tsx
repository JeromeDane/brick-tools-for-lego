import React, {useEffect} from 'react'
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import {ScrollView} from 'react-native'
import {Text} from '../components/Themed'
import {SetTabsParamList} from '../navigation/SetTabs'
import {useSets} from '../data/sets'
import Inventory from '../components/Inventory'
import inventoryParts, {InventoryPart} from '../data/inventory-parts'

export default function SetPartsScreen({navigation, route: {params: {id}}} : MaterialTopTabScreenProps<SetTabsParamList, 'SetParts'>) {
  const set = useSets().byId[id],
        inventory = set && set.inventories && set.inventories[0],
        numParts = ((inventory && inventoryParts[inventory.id]) || [])
          .reduce((count: number, inventoryPart: InventoryPart) => count + inventoryPart.quantity, 0)
  useEffect(() => {
    navigation.setOptions({
      title: `Parts (${numParts.toLocaleString()})`
    })
  }, [set])
  return (
    <ScrollView style={{padding: 20}}>
      {inventory
        ? <Inventory id={inventory.id} navigation={navigation} />
        : <Text>Unable to find inventory set number "{id}"</Text>
      }
    </ScrollView>
  )
}
