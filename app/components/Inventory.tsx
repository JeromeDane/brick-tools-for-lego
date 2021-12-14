import React, {useState} from 'react'
import sortBy from 'sort-by'
import { Image, Switch, TouchableOpacity } from 'react-native'
import { Picker, Text, View } from './Themed'
import inventoryParts from '../data/raw/inventory_parts.json'
import {getElement} from '../data/elements'
import partsByNumber from '../data/parts'
import colors from '../data/colors'
import partCategories from'../data/raw/part_categories-by-id.json'

const Inventory = ({id}: {id: string, setNum: string}) => {
  const defaultSortOrder = 'category.name,subCategory,width,length,height,color.sortOrder',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [showSpareParts, setShowSpareParts] = useState(false),
        parts = inventoryParts[id]?.map((part: any) => {
          return Object.assign(part, partsByNumber[part.partNum], {
            color: colors[part.colorId],
            category: partCategories[partsByNumber[part.partNum].partCatId]
          })
        })
  return (
    <View>
      <View style={{
          marginBottom: 20,
          marginTop: 10
        }}>
        <Picker
          label="Sort by"
          selectedValue={sortOrder}
          onValueChange={setSortOrder}>
          <Picker.Item label="Category, size, and color" value={defaultSortOrder} />
          <Picker.Item label="Color, category, and size" value={'color.sortOrder,category.name,subCategory,width,length,height'} />
          <Picker.Item label="Size, category, and color" value={'width,length,height,category.name,subCategory,color.sortOrder'} />
          <Picker.Item label="Size descending, category, and color" value={'-width,-length,-height,category.name,subCategory,color.sortOrder'} />
          <Picker.Item label="Size, color, and category" value={'width,length,height,color.sortOrder,category.name,subCategory'} />
          <Picker.Item label="Size descending, color, and category" value={'-width,-length,-height,color.sortOrder,category.name,subCategory'} />
        </Picker>
      </View>
      <View style={{marginBottom: 20}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              paddingRight: 10,
              flexGrow: 1
            }}
            onPress={() => setShowSpareParts(!showSpareParts)}
          >
            <Text style={{textAlign: 'right'}}>Show spare parts</Text>
          </TouchableOpacity>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showSpareParts ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setShowSpareParts}
            value={showSpareParts}
          />
        </View>
      </View>
      {(showSpareParts ? parts : parts.filter((p: any) => !p.isSpare))
        ?.sort(sortBy.apply(sortBy, sortOrder.split(',')))
        .map((part: any, i: number) => {
          const element = getElement(part.partNum, part.colorId)
          return <View key={i} style={{flex: 1, flexDirection: 'row', flexGrow: 1, marginBottom: 10}}>
            <Image
              style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
              source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
            <View>
              <Text>Part: {part.partNum} Element: {element.id}</Text>
              <Text>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Text>
              <Text>{part.name}</Text>
              <Text>{part.color.name} ({part.colorId})</Text>
              <Text>Qty: {part.quantity}{part.isSpare ? ' (spare part)' : ''}</Text>
            </View>
          </View>
        })
      }
    </View>
  )
}

export default Inventory