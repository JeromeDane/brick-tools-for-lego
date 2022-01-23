import React, {useEffect, useMemo, useRef, useState} from 'react'
import {ScrollView} from 'react-native'
import {sortBy} from 'sort-by-typescript'
import {Text, View} from '../../components/Themed'
import Paginator from '../../components/Paginator'
import TextInput from '../../components/TextInput'
import {usePartsAsLists} from '../../data/parts'
import {colorsList} from '../../data/colors'
import {partCategoriesList} from '../../data/part-categories'
import Switch from '../../components/Switch'
import LoadingWrapper from '../../components/LoadingWrapper'
import PartPreview from './PartPreview'
import Select from '../../components/Select'
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
            autoComplete={false}
            label="Search Parts"
            clearable
            value={filterBy}
            onChangeText={value => {
              setCurrentPage(0)
              setFilterBy(value)
            }} />
        </View>
        <View style={{marginBottom: 20}}>
          <Select
            label="Sort by"
            value={sortOrder}
            onValueChange={value => {
              setIsSorting(true)
              setCurrentPage(0)
              setSortOrder(value.toString())
            }}
            items={[
              {label: 'Category, size', value: defaultSortOrder},
              {label: 'Size, category', value: 'width,length,height,category.name,subCategory'},
              {label: 'Size descending, category', value: '-width,-length,-height,category.name,subCategory'}
            ]}/>
        </View>
        <View style={{marginBottom: 20}}>
          <Select
            label="Category"
            value={partCategory}
            onValueChange={value => {
              setCurrentPage(0)
              setPartCategory(value.toString())
            }}
            items={[{label: 'All themes', value: ''}].concat(partCategoriesList.sort(sortBy('name')).map(
              ({id, name}) => ({label: name, value: id})
            ))} />
        </View>
        <View style={{marginBottom: 20}}>
          <Select
            label="Color"
            value={colorFilter}
            onValueChange={value => {
              setCurrentPage(0)
              setColorFilter(value.toString())
            }}
            items={[{label: 'All available colors', value: ''}].concat(colorsList.map(
              ({id, name}) => ({label: name, value: id})
            ))} />
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
