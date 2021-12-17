import React, {useState} from 'react'
import sortBy from 'sort-by'
import { Image, Switch, TouchableOpacity } from 'react-native'
import { Picker, Text, View } from './Themed'
import inventoryParts from '../data/inventory-parts'

const Inventory = ({id}: {id: string, setNum: string}) => {
  const defaultSortOrder = 'element.part.category.name,element.part.subCategory,element.part.width,element.part.length,element.part.height,element.color.sortOrder',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [showSpareParts, setShowSpareParts] = useState(false),
        setInventoryParts = inventoryParts[id] || []
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
          <Picker.Item label="Color, category, and size" value={'element.color.sortOrder,element.part.category.name,element.part.subCategory,element.part.width,element.part.length,element.part.height'} />
          <Picker.Item label="Size, category, and color" value={'element.part.width,element.part.length,element.part.height,element.part.category.name,element.part.subCategory,element.color.sortOrder'} />
          <Picker.Item label="Size descending, category, and color" value={'-element.part.width,-element.part.length,-element.part.height,element.part.category.name,element.part.subCategory,element.color.sortOrder'} />
          <Picker.Item label="Size, color, and category" value={'element.part.width,element.part.length,element.part.height,element.color.sortOrder,element.part.category.name,element.part.subCategory'} />
          <Picker.Item label="Size descending, color, and category" value={'-element.part.width,-element.part.length,-element.part.height,element.color.sortOrder,element.part.category.name,element.part.subCategory'} />
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
      {(showSpareParts ? setInventoryParts : setInventoryParts.filter(({isSpare}) => !isSpare))
        .sort(sortBy.apply(sortBy, sortOrder.split(',')))
        .map(({element: {id, part, color}, quantity, isSpare}, i: number) => {
          return <View key={i} style={{flex: 1, flexDirection: 'row', flexGrow: 1, marginBottom: 10}}>
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
          </View>
        })
      }
    </View>
  )
}

export default Inventory