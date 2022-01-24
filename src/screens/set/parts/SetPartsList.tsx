import React, {useMemo, useRef, useState} from 'react'
import {sortBy} from 'sort-by-typescript'
import {ActivityIndicator, ScrollView, View} from 'react-native'
import Paginator from '../../../components/Paginator'
import Switch from '../../../components/Switch'
import Select from '../../../components/Select'
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
        defaultSortOrder = 'part.category.name,part.subCategory,part.width,part.length,part.height,color.sortOrder,name',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [showSpareParts, setShowSpareParts] = useState(false),
        [pageSize, setPageSize] = useState(25),
        [currentPage, setCurrentPage] = useState(0),
        scrollRef = useRef(),
        sortedInventortParts = useMemo(
          () => inventoryParts ? [...inventoryParts].sort(sortBy.apply(sortBy, sortOrder.split(','))) : null,
          [inventoryParts, sortOrder]
        ),
        partsToShow = showSpareParts ? sortedInventortParts : sortedInventortParts?.filter(({isSpare}) => !isSpare)
  return (
    <ScrollView style={{padding: 20}} ref={scrollRef}>
      {partsToShow
        ? <View>
          <View style={{marginVertical: 10}}>
            <Select
              label="Sort by"
              value={sortOrder}
              onValueChange={value => setSortOrder(value.toString())}
              items={[
                {label: 'Category, size, and color', value: defaultSortOrder},
                {label: 'Color, category, and size', value: 'color.sortOrder,part.category.name,part.subCategory,part.width,part.length,part.height,name'},
                {label: 'Size, category, and color', value: 'part.width,part.length,part.height,part.category.name,part.subCategory,color.sortOrder,name'},
                {label: 'Size descending, category, and color', value: '-part.width,-part.length,-part.height,part.category.name,part.subCategory,color.sortOrder,name'},
                {label: 'Size, color, and category', value: 'part.width,part.length,part.height,color.sortOrder,part.category.name,part.subCategory,name'},
                {label: 'Size descending, color, and category', value: '-part.width,-part.length,-part.height,color.sortOrder,part.category.name,part.subCategory,name'}
              ]}/>
          </View>
          <View style={{marginBottom: 20, alignItems: 'flex-end'}}>
            <Switch
              label="Show spare parts"
              onValueChange={setShowSpareParts}
              value={showSpareParts} />
          </View>
          {partsToShow
            ?.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((inventoryPart, i: number) =>
              <SetPartPreview
                key={i}
                navigation={navigation}
                inventortPart={inventoryPart}
                onPress={() => { navigation.navigate('Element', {partNum: inventoryPart.part.partNum, colorId: inventoryPart.color.id})}} />
            )
          }
          {partsToShow?.length
            ? <Paginator
              pageSize={pageSize}
              numItems={partsToShow.length}
              onPageSizeChange={value => setPageSize(parseInt(value.toString()))}
              onPageChange={val => {
                scrollRef.current.scrollTo({y: 0, animated: true})
                setCurrentPage(val)
              }}
              selectedValue={currentPage} />
            : null
          }
          <View style={{height: 50}} />
        </View>
        : <ActivityIndicator color="#aaa" />
      }
    </ScrollView>
  )
}
