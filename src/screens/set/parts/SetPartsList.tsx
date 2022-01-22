import React, {useMemo, useState} from 'react'
import {sortBy} from 'sort-by-typescript'
import {ActivityIndicator, View} from 'react-native'
import {Picker} from '../../../components/Themed'
import Switch from '../../../components/Switch'
import LoadingWrapper from '../../../components/LoadingWrapper'
import {useInventoryParts} from '../../../data/inventory-parts'
import SetPartPreview from './SetPartPreview'
import type {Set} from '../../../data/types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../../navigation/types'

type SetPartsListParams = {
  set?: Set,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Set'>
}

export default function SetPartsList({navigation, set}: SetPartsListParams) {
  const inventoryId = (set && set.inventories && set.inventories[0] && set.inventories[0].id) || '',
        inventoryParts = useInventoryParts(inventoryId),
        defaultSortOrder = 'element.part.category.name,element.part.subCategory,element.part.width,element.part.length,element.part.height,element.color.sortOrder,name',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [showSpareParts, setShowSpareParts] = useState(false),
        sortedInventortParts = useMemo(
          () => inventoryParts ? [...inventoryParts].sort(sortBy.apply(sortBy, sortOrder.split(','))) : null,
          [inventoryParts]
        )
  return (
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
                navigation={navigation}
                inventortPart={inventoryPart}
                onPress={id => { navigation.navigate('Element', {id})}} />
            )
          }
        </View>
        : <ActivityIndicator color="#aaa" />
      }
    </LoadingWrapper>
  )
}
