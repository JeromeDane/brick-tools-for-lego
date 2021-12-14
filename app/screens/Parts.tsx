import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native'
import sortBy from 'sort-by'
import { Paginator, Picker, Text, TextInput, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import {partsList} from '../data/parts'
import { getElementByPartAndColor } from '../data/elements'
import {partCategoriesList} from '../data/part-categories'

const TabsScreen = ({ navigation }: RootTabScreenProps<'Themes'>) => {
  const defaultSortOrder = 'category.name,subCategory,width,length,height',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [partCategory, setPartCategory] = useState(''),
        [showPrints, setShowPrints] = useState(false),
        [pageSize, setPageSize] = useState(25),
        [currentPage, setCurrentPage] = useState(0),
        [filterBy, setFilterBy] = useState(''),
        scrollRef = useRef(),
        filteredPartNumbers = partsList.filter(part => {
          return (part.colors.length > 0) &&
                 (!filterBy || (part.partNum + part.name).toLowerCase().match(filterBy.toLowerCase())) &&
                 (!partCategory || part.category.id == partCategory) &&
                 (showPrints || !part.partNum.match('pr'))
        })
  return (
    <View style={styles.container}>
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
            onValueChange={setSortOrder}>
            <Picker.Item label="Category, size" value={defaultSortOrder} />
            <Picker.Item label="Size, category" value={'width,length,height,category.name,subCategory'} />
            <Picker.Item label="Size descending, category" value={'-width,-length,-height,category.name,subCategory'} />
          </Picker>
        </View>
        <View style={{marginBottom: 20}}>
          <Picker
            label="Category"
            selectedValue={partCategory}
            onValueChange={setPartCategory}>
            <Picker.Item label="All categories" value="" />
            {partCategoriesList.map(({id, name}, i) =>
              <Picker.Item label={name} value={id} key={i} />
            )}
          </Picker>
        </View>
        <View style={{marginBottom: 20}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              paddingRight: 10,
              flexGrow: 1
            }}
            onPress={() => setShowPrints(!showPrints)}
            >
            <Text style={{textAlign: 'right'}}>Show printed parts</Text>
          </TouchableOpacity>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showPrints ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setShowPrints}
            value={showPrints}
          />
          {/*
          */}
        </View>
      </View>
        {filteredPartNumbers.length
          ? filteredPartNumbers
            .sort(sortBy.apply(sortBy, sortOrder.split(',')))
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((part, i: number) => {
              return <View style={styles.part} key={i}>
                <View>
                  {part.colors.slice(0, 1).map((color, i: number) => {
                    const element = getElementByPartAndColor(part.partNum, color.id)
                    return <View key={i}>
                      <Image
                        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
                        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
                    </View>
                  })}
                </View>
                <View>
                  <Text>{part.category.name}{part.subCategory ? ', ' + part.subCategory : ''}</Text>
                  <Text>{part.name}</Text>
                  <Text>Part Number:{part.partNum}</Text>
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
    </View>
  )
}

export default TabsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
})
