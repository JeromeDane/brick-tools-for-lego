import React, {useEffect, useMemo, useState} from 'react'
import {sortBy} from 'sort-by-typescript'
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import {ActivityIndicator, ScrollView, View} from 'react-native'
import {Picker} from '../../../components/Themed'
import {SetTabsParamList} from '../SetScreen'
import {useSet} from '../../../data/sets'
import Switch from '../../../components/Switch'
import LoadingWrapper from '../../../components/LoadingWrapper'
import {useInventoryParts} from '../../../data/inventory-parts'
import SetPartPreview from './SetPartPreview'

export default function SetPartsScreen({navigation, route: {params: {id}}} : MaterialTopTabScreenProps<SetTabsParamList, 'SetParts'>) {
  const set = useSet(id),
        inventoryId = (set && set.inventories && set.inventories[0] && set.inventories[0].id) || '',
        inventoryParts = useInventoryParts(inventoryId),
        defaultSortOrder = 'element.part.category.name,element.part.subCategory,element.part.width,element.part.length,element.part.height,element.color.sortOrder,name',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [showSpareParts, setShowSpareParts] = useState(false),
        sortedInventortParts = useMemo(
          () => inventoryParts ? inventoryParts.sort(sortBy.apply(sortBy, sortOrder.split(','))) : null,
          [inventoryParts]
        )
  useEffect(() => {
    navigation.setOptions({title: `Parts (${set?.numParts.toLocaleString()})`})
  }, [set?.numParts])
  return (
    <ScrollView style={{padding: 20}}>
      <LoadingWrapper>
        {sortedInventortParts
          ? <View>
            <View style={{marginVertical: 10}}>
              <Picker
                label="Sort by"
                selectedValue={sortOrder}
                onValueChange={value => setSortOrder(value.toString())}>
                <Picker.Item label="Category, size, and color" value={defaultSortOrder} />
                <Picker.Item label="Color, category, and size" value={'element.color.sortOrder,element.part.category.name,element.part.subCategory,element.part.width,element.part.length,element.part.height,name'} />
                <Picker.Item label="Size, category, and color" value={'element.part.width,element.part.length,element.part.height,element.part.category.name,element.part.subCategory,element.color.sortOrder,name'} />
                <Picker.Item label="Size descending, category, and color" value={'-element.part.width,-element.part.length,-element.part.height,element.part.category.name,element.part.subCategory,element.color.sortOrder,name'} />
                <Picker.Item label="Size, color, and category" value={'element.part.width,element.part.length,element.part.height,element.color.sortOrder,element.part.category.name,element.part.subCategory,name'} />
                <Picker.Item label="Size descending, color, and category" value={'-element.part.width,-element.part.length,-element.part.height,element.color.sortOrder,element.part.category.name,element.part.subCategory,name'} />
              </Picker>
            </View>
            <View style={{marginBottom: 20, alignItems: 'flex-end'}}>
              <Switch
                label="Show spare parts"
                onValueChange={setShowSpareParts}
                value={showSpareParts} />
            </View>
            {(showSpareParts ? sortedInventortParts : sortedInventortParts.filter(({isSpare}) => !isSpare))
              .map((inventoryPart, i: number) =>
                <SetPartPreview
                  key={i}
                  inventortPart={inventoryPart}
                  onPress={id => { navigation.navigate('Element', {id})}} />
              )
            }
          </View>
          : <ActivityIndicator color="#aaa" />
        }
      </LoadingWrapper>
    </ScrollView>
  )
}
