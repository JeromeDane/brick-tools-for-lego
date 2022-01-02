import React, {useMemo, useRef, useState} from 'react'
import {ScrollView, StyleSheet, Image} from 'react-native'
import {sortBy} from 'sort-by-typescript'
import {Paginator, Picker, Text, TextInput, View} from '../components/Themed'
import {usePartsAsLists} from '../data/parts'
import {useGetElementByPartAndColor} from '../data/elements'
import {colorsList} from '../data/colors'
import {partCategoriesList} from '../data/part-categories'
import Switch from '../components/Switch'

const PartsScreen = () => {
  const defaultSortOrder = 'category.name,subCategory,width,length,height',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [partCategory, setPartCategory] = useState(''),
        [colorFilter, setColorFilter] = useState(''),
        [showPrints, setShowPrints] = useState(false),
        [pageSize, setPageSize] = useState(25),
        [currentPage, setCurrentPage] = useState(0),
        [filterBy, setFilterBy] = useState(''),
        scrollRef = useRef(),
        partsList = usePartsAsLists(),
        filteredPartNumbers = useMemo(
          () => partsList ?
            partsList.filter(part => {
              return (part.colors.length > 0) &&
                    (!filterBy || (part.partNum + part.name).toLowerCase().match(filterBy.toLowerCase())) &&
                    (!partCategory || part.category.id == partCategory) &&
                    (showPrints || !part.partNum.match('pr')) &&
                    (!colorFilter || part.colors.find(({id}) => id == colorFilter))
            })
            : [],
          [partsList]
        ),
        defaultColorId = colorFilter || colorsList[0].id,
        getElementByPartAndColor = useGetElementByPartAndColor()
  return (
    <ScrollView ref={scrollRef} style={{
      paddingBottom: 100,
      padding: 20,
      flex: 1,
      flexGrow: 1
    }}>
      <View style={{marginBottom: 20}}>
        <TextInput
          label="Search Parts"
          onChangeText={value => {
            setCurrentPage(0)
            setFilterBy(value)
          }} />
      </View>
      <View style={{marginBottom: 20}}>
        <Picker
          label="Sort by"
          selectedValue={sortOrder}
          onValueChange={value => {
            setCurrentPage(0)
            setSortOrder(value)
          }}>
          <Picker.Item label="Category, size" value={defaultSortOrder} />
          <Picker.Item label="Size, category" value={'width,length,height,category.name,subCategory'} />
          <Picker.Item label="Size descending, category" value={'-width,-length,-height,category.name,subCategory'} />
        </Picker>
      </View>
      <View style={{marginBottom: 20}}>
        <Picker
          label="Category"
          selectedValue={partCategory}
          onValueChange={value => {
            setCurrentPage(0)
            setPartCategory(value)
          }}>
          <Picker.Item label="All categories" value="" />
          {partCategoriesList.map(({id, name}, i) =>
            <Picker.Item label={name} value={id} key={i} />
          )}
        </Picker>
      </View>
      <View style={{marginBottom: 20}}>
        <Picker
          label="Color"
          selectedValue={colorFilter}
          onValueChange={value => {
            setCurrentPage(0)
            setColorFilter(value)
          }}>
          <Picker.Item label="All available colors" value="" />
          {colorsList.map(({id, name}, i) =>
            <Picker.Item label={name} value={id} key={i} />
          )}
        </Picker>
      </View>
      <View style={{marginBottom: 20}}>
        <View style={{alignItems: 'flex-end'}}>
          <Switch
            label="Show printed parts"
            onValueChange={setShowPrints}
            value={showPrints} />
        </View>
      </View>
      {filteredPartNumbers.length
        ? filteredPartNumbers
          .sort(sortBy.apply(sortBy, sortOrder.split(',')))
          .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
          .map((part, i: number) => {
            const defaultColor = part.colors.find(({id}) => id == defaultColorId) || part.colors[0],
                  element = defaultColor && getElementByPartAndColor(part.partNum, defaultColor.id)
            return <View style={styles.part} key={i}>
              {element &&
                <Image
                  style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
                  source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
              }
              <View>
                <Text>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Text>
                <Text>{part.name}</Text>
                <Text>Part Number: {part.partNum}</Text>
                <Text>Colors: {part.colors.length}</Text>
              </View>
            </View>
          })
        : <Text style={{paddingVertical: 20}}>No parts found matching your criteria.</Text>
      }
      <View style={{paddingTop: 20}}>
        <Paginator
          pageSize={pageSize}
          numItems={filteredPartNumbers.length}
          onPageSizeChange={setPageSize}
          onPageChange={(val : number) => {
            scrollRef.current?.scrollTo({y: 0, animated: true})
            setCurrentPage(val)
          }}
          selectedValue={currentPage} />
      </View>
    </ScrollView>
  )
}

export default PartsScreen

const styles = StyleSheet.create({
  part: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    paddingVertical: 10,
    paddingRight: 20,
    flexGrow: 1
  },
  image: {
    backgroundColor: 'gray',
    marginRight: 10
  }
})
