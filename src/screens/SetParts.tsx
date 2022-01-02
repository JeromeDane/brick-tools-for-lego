import React, {useEffect} from 'react'
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import {ScrollView} from 'react-native'
import {Text} from '../components/Themed'
import {SetTabsParamList} from '../navigation/SetTabs'
import {useSet} from '../data/sets'
import Inventory from '../components/Inventory'
import {useInventoryParts} from '../data/inventory-parts'

export default function SetPartsScreen({navigation, route: {params: {id}}} : MaterialTopTabScreenProps<SetTabsParamList, 'SetParts'>) {
  const set = useSet(id),
        inventoryId = (set && set.inventories && set.inventories[0] && set.inventories[0].id) || '',
        inventoryParts = inventoryId ? useInventoryParts(inventoryId) : null,
        numParts = inventoryParts?.reduce((count: number, inventoryPart) => count + inventoryPart.quantity, 0)
  useEffect(() => {
    navigation.setOptions({
      title: `Parts (${numParts ? numParts.toLocaleString() : '?'})`
    })
  }, [set])
  return (
    <ScrollView style={{padding: 20}}>
      {inventoryParts
        ? <Inventory id={inventoryId} navigation={navigation} />
        : <Text>Unable to find inventory set number &quot;{id}&quot;</Text>
      }
    </ScrollView>
  )
}
