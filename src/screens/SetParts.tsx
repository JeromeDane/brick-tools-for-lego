import React, {useEffect, useMemo, useState} from 'react'
import {sortBy} from 'sort-by-typescript'
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import {Image, ScrollView, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import {Picker, Text} from '../components/Themed'
import {SetTabsParamList} from '../navigation/SetTabs'
import {useSet} from '../data/sets'
import Switch from '../components/Switch'
import {useInventoryParts} from '../data/inventory-parts'

export default function SetPartsScreen({navigation, route: {params: {id}}} : MaterialTopTabScreenProps<SetTabsParamList, 'SetParts'>) {
  const set = useSet(id),
        inventoryId = (set && set.inventories && set.inventories[0] && set.inventories[0].id) || '',
        inventoryParts = useInventoryParts(inventoryId),
        numParts = useMemo(
          () => inventoryParts?.reduce((count: number, inventoryPart) => count + inventoryPart.quantity, 0),
          [inventoryParts]
        ),
        defaultSortOrder = 'element.part.category.name,element.part.subCategory,element.part.width,element.part.length,element.part.height,element.color.sortOrder,name',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [showSpareParts, setShowSpareParts] = useState(false)
  console.log('parts:', Object.keys(inventoryParts || {}).length)
  if(!inventoryParts) console.log('processing inventory parts')
  useEffect(() => {
    navigation.setOptions({
      title: `Parts (${inventoryParts
        ? numParts ? numParts.toLocaleString() : '?'
        : '...'
      })`
    })
  }, [numParts])
  return (
    <ScrollView style={{padding: 20}}>
      {inventoryParts
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
          {(showSpareParts ? inventoryParts : inventoryParts.filter(({isSpare}) => !isSpare))
            .sort(sortBy.apply(sortBy, sortOrder.split(',')))
            .map(({element: {id, part, color}, quantity, isSpare}, i: number) => {
              return <TouchableOpacity key={i} style={{flex: 1, flexDirection: 'row', flexGrow: 1, marginBottom: 10}}
                onPress={() => { navigation.navigate('Element', {id}) }}>
                <Image
                  style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
                  source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${id}.jpg`}} />
                <View>
                  <Text>Part: {part.partNum} Element: {id}</Text>
                  <Text>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Text>
                  <Text>{part.name}</Text>
                  <Text>{color.name} ({color.id})</Text>
                  <Text>Qty: {quantity}{isSpare ? ' (spare part)' : ''}</Text>
                </View>
              </TouchableOpacity>
            })
          }
        </View>
        : <ActivityIndicator color="#aaa" />
      }
    </ScrollView>
  )
}
