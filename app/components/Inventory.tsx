import React, {useState} from 'react'
import sortBy from 'sort-by'
import { Image } from 'react-native'
import { Picker, Text, View } from './Themed'
import inventoryParts from '../data/inventory_parts.json'
import {getElement} from '../data/elements'
import partsByNumber from '../data/parts-by-number.json'
import colors from '../data/colors-by-id.json'
import partCategories from'../data/part_categories-by-id.json'

const Inventory = ({id}: {id: string, setNum: string}) => {
  const defaultSortOrder = 'category.name,width,length,height,nameSort,color.order',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
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
          <Picker.Item label="Color, category, and size" value={'color.order,category.name,width,length,height,nameSort'} />
          <Picker.Item label="Size, category, and color" value={'width,length,height,category.name,nameSort,color.order'} />
          <Picker.Item label="Size descending, category, and color" value={'-width,-length,-height,category.name,nameSort,color.order'} />
          <Picker.Item label="Size, color, and category" value={'width,length,height,color.order,nameSort,category.name'} />
          <Picker.Item label="Size descending, color, and category" value={'-width,-length,-height,color.order,nameSort,category.name'} />
        </Picker>
      </View>
      {parts
        ?.sort(sortBy.apply(sortBy, sortOrder.split(',')))
        .map((part: any, i: number) =>
          <View key={i} style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
            <Image
              style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
              source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${getElement(part.partNum, part.colorId)}.jpg`}} />
            <View>
              <Text>Part: {part.partNum} Element: {getElement(part.partNum, part.colorId)}</Text>
              <Text>Category: {part.category.name}</Text>
              <Text>Name: {part.name}</Text>
              <Text>Color: {part.color.name} ({part.colorId})</Text>
              <Text>Quantity: {part.quantity}</Text>
              <Text>{part.isSpare ? 'Spare part' : ''}</Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Inventory