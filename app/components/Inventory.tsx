import React, { useEffect, useState } from 'react';
import { ScrollView, Linking, Button, Image } from 'react-native';
import sortBy from 'sort-by'
import { Text, View } from './Themed';
import ScaledImage from './ScaledImage'
import inventoryParts from '../data/inventory_parts.json'
import {getElement} from '../data/elements'
import partsByNumber from '../data/parts-by-number.json'
import colors from '../data/colors-by-id.json'
import themes from '../data/themes-by-id.json'
import partCategories from'../data/part_categories-by-id.json'

const getSort = (x: any, keys: string[]) =>
  keys
    .map(key =>
      key.indexOf('.') > 0
        ? x[key.split('.')[0]][key.split('.')[1]]
        : x[key]
    )
    .map(v => {
      const number = parseInt(v)
      return isNaN(number)
        ? v
        : number < 10
          ? '00' + number
          : number < 99
            ? '0' + number
            : number
    })
    .join('  |  ')

const by = (keys: string[]) =>
  (first: any, second: any) => {
    const [a, b] = [first, second].map(x => getSort(x, keys))
    return a > b ? 1 : a < b ? -1 : 0
  }

const Inventory = ({id}: {id: string, setNum: string}) => {
  const parts = inventoryParts[id]?.map((part: any) => {
    return Object.assign(part, partsByNumber[part.partNum], {
      color: colors[part.colorId],
      category: partCategories[partsByNumber[part.partNum].partCatId]
    })
  })
  const sortOrder = ['category.name', 'width', 'length', 'height', 'nameSort', 'color.order']
  return (
    <View>
      {/* {parts.sort(sortBy('category.name', 'nameSort', 'width', 'length', 'height')) */}
      {/* {parts.sort(sortBy('name')) */}
      {parts.sort(by(sortOrder))
        .map((part: any, i: number) =>
          <View key={i} style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
            <Image
              style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
              source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${getElement(part.partNum, part.colorId)}.jpg`}} />
            <View>
              <Text>{getSort(part, sortOrder) || '?'}</Text>
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