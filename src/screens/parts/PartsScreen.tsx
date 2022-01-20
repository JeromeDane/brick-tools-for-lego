import React, {useEffect, useMemo, useRef, useState} from 'react'
import {ScrollView} from 'react-native'
import {sortBy} from 'sort-by-typescript'
import {Paginator, Picker, Text, TextInput, View} from '../../components/Themed'
import {usePartsAsLists} from '../../data/parts'
import {colorsList} from '../../data/colors'
import {partCategoriesList} from '../../data/part-categories'
import Switch from '../../components/Switch'
import LoadingWrapper from '../../components/LoadingWrapper'
import PartPreview from './PartPreview'
import {RootStackScreenProps} from '../../navigation/types'

const PartsScreen = ({navigation} : RootStackScreenProps<'Element'>) => {
  const defaultSortOrder = 'category.name,subCategory,width,length,height',
        [sortOrder, setSortOrder] = useState(defaultSortOrder),
        [partCategory, setPartCategory] = useState(''),
        [colorFilter, setColorFilter] = useState(''),
        [showPrints, setShowPrints] = useState(false),
        [pageSize, setPageSize] = useState(25),
        [isSorting, setIsSorting] = useState(true),
        [currentPage, setCurrentPage] = useState(0),
        [filterBy, setFilterBy] = useState(''),
        scrollRef = useRef(),
        partsList = usePartsAsLists(),
        sortedParts = useMemo(
          () => (!isSorting && partsList)
            ? [...partsList].sort(sortBy.apply(sortBy, sortOrder.split(',')))
            : null,
          [partsList, sortOrder, isSorting]
        ),
        filteredParts = useMemo(
          () => sortedParts ?
            sortedParts.filter(part => {
              return (part.colors.length > 0) &&
                    (!filterBy || (part.partNum + part.name).toLowerCase().match(filterBy.toLowerCase())) &&
                    (!partCategory || part.category.id == partCategory) &&
                    (showPrints || !part.partNum.match('pr')) &&
                    (!colorFilter || part.colors.find(({id}) => id == colorFilter))
            })
            : null,
          [sortedParts, showPrints, colorFilter, partCategory, filterBy]
        )
  useEffect(() => {
    if(isSorting) setIsSorting(false)
  }, [isSorting])
  return (
    <ScrollView ref={scrollRef} style={{
      paddingBottom: 100,
      padding: 20,
      flex: 1,
      flexGrow: 1
    }}>
      <LoadingWrapper loading={!filteredParts}>
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
              setIsSorting(true)
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
              setPartCategory(value.toString())
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
              setColorFilter(value.toString())
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
        <LoadingWrapper loading={isSorting || !filteredParts}>
          {filteredParts?.length
            ? filteredParts
              .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
              .map((part, i: number) =>
                <PartPreview
                  part={part}
                  key={i}
                  defaultColorId={colorFilter}
                  onPress={id => { navigation.navigate('Part', {id})}}/>
              )
            : <Text style={{paddingVertical: 20}}>No parts found matching your criteria.</Text>
          }
          <View style={{paddingTop: 20}}>
            <Paginator
              pageSize={pageSize}
              numItems={filteredParts?.length || 0}
              onPageSizeChange={setPageSize}
              onPageChange={(val : number) => {
                scrollRef.current?.scrollTo({y: 0, animated: true})
                setCurrentPage(val)
              }}
              selectedValue={currentPage} />
          </View>
        </LoadingWrapper>
      </LoadingWrapper>
      <View style={{height: 50}} />
    </ScrollView>
  )
}

export default PartsScreen
