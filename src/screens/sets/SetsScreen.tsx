import React, {useEffect, useMemo, useRef, useState} from 'react'
import {ActivityIndicator, ScrollView} from 'react-native'
import {sortBy} from 'sort-by-typescript'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {Text, View} from '../../components/Themed'
import Paginator from '../../components/Paginator'
import Select from '../../components/Select'
import TextInput from '../../components/TextInput'
import LoadingWrapper from '../../components/LoadingWrapper'
import {RootStackParamList} from '../../navigation/types'
import {useSets} from '../../data/sets'
import {themesList} from '../../data/themes'
import {useIsLoggedInToBrickset} from '../../api/brickset'
import TextLink from '../../components/TextLink'
import SetPreview from './SetPreview'

export default function SetsScreen({navigation}: DrawerScreenProps<RootStackParamList, 'Sets'>) {
  const [sortField, setSortField] = useState('-year'),
        [pageSize, setPageSize] = useState(25),
        [filterBy, setFilterBy] = useState(''),
        [theme, setTheme] = useState(''),
        [isSorting, setIsSorting] = useState(true),
        [collectionFilter, setCollectionFilter] = useState(''),
        [currentPage, setCurrentPage] = useState(0),
        isLoggedInToBrickset = useIsLoggedInToBrickset(),
        scrollRef = useRef(),
        sets = useSets(),
        sortedSets = useMemo(
          () => isSorting ? [] : [...sets].sort(sortBy.apply(sortBy, sortField.split(','))),
          [isSorting, sets, sortBy]
        ),
        filteredSets = useMemo(
          () => sortedSets.filter(set =>
            (!filterBy || (set.setNum + set.name).toLowerCase().match(filterBy.toLowerCase())) &&
            (!theme || set.theme.id == theme) &&
            (!isLoggedInToBrickset || !collectionFilter ||
              (collectionFilter == 'owned' && set.collection.qtyOwned > 0) ||
              (collectionFilter == 'not-owned' && set.collection.qtyOwned === 0) ||
              (collectionFilter == 'wanted' && set.collection.wanted) ||
              (collectionFilter == 'not-wanted' && !set.collection.wanted) ||
              (collectionFilter == 'not-wanted-not-owned' && !set.collection.wanted && set.collection.qtyOwned === 0)
            )),
          [sortedSets, filterBy, collectionFilter, theme]
        )
  useEffect(() => {
    if(isSorting) setIsSorting(false)
  }, [isSorting])
  return (
    <ScrollView ref={scrollRef} style={{
      padding: 20,
      paddingBottom: 100
    }}>
      <LoadingWrapper>
        <View>
          <TextInput
            clearable
            label="Search Sets"
            autoComplete={false}
            value={filterBy}
            onChangeText={value => {
              setCurrentPage(0)
              setFilterBy(value)
            }} />
        </View>
        <View style={{marginVertical: 15}}>
          <Select
            label="Theme"
            value={theme}
            onValueChange={theme => {
              setCurrentPage(0)
              setTheme(theme.toString())
            }}
            items={[{label: 'All themes', value: ''}].concat([...themesList].sort(sortBy('name')).map(theme =>({
              label: `${theme.name} (${theme.numSets.toLocaleString()} sets)`,
              value: theme.id
            })))} />
        </View>
        <View style={{marginBottom: 0}}>
          <Select
            label="Sort by"
            value={sortField}
            onValueChange={field => {
              setIsSorting(true)
              setCurrentPage(0)
              setSortField(field.toString())
            }}
            items={[
              {label: 'Set Number', value: 'setNumSort'},
              {label: 'Set Number (desc)', value: '-setNumSort'},
              {label: 'Most Owned', value: '-ownedBy'},
              {label: 'Most Wanted', value: '-wantedBy'},
              {label: 'Name', value: 'name'},
              {label: 'Name (desc)', value: '-name'},
              {label: 'Parts', value: 'numParts'},
              {label: 'Parts (desc)', value: '-numParts'},
              {label: 'Retail Price', value: 'LEGOCom.US.retailPrice'},
              {label: 'Retail Price (desc)', value: '-LEGOCom.US.retailPrice'},
              {label: 'Year Released', value: 'year'},
              {label: 'Year Released (desc)', value: '-year'}
            ]} />
        </View>
        {isLoggedInToBrickset
          ? <View style={{marginVertical: 20}}>
            <Select
              label="Collection"
              value={collectionFilter}
              onValueChange={value => {
                setCurrentPage(0)
                setCollectionFilter(value.toString())
              }}
              items={[
                {label: 'Any', value: ''},
                {label: 'Owned', value: 'owned'},
                {label: 'Not owned', value: 'not-owned'},
                {label: 'Wanted', value: 'wanted'},
                {label: 'Not Wanted', value: 'not-wanted'},
                {label: 'Not Wanted and Not Owned', value: 'not-wanted-not-owned'}
              ]}/>
          </View>
          : <TextLink
            style={{marginTop: 10, marginBottom: 20}}
            onPress={() => navigation.navigate('Settings')}>
            Log into Brickset to filter by sets you own.
          </TextLink>
        }
        {filteredSets.length
          ? filteredSets
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map(set => <SetPreview key={set.setNum} {...{set, navigation, sortField}} />)
          : <Text style={{textAlign: 'center'}}>
            {(isSorting || sets.length == 0)
              ? <ActivityIndicator size="large" color="#aaaa" />
              : 'No results match your search criteria'
            }
          </Text>
        }
        <View style={{height: 20}} />
        {filteredSets.length
          ? <Paginator
            pageSize={pageSize}
            numItems={filteredSets.length}
            onPageSizeChange={setPageSize}
            onPageChange={(val : number) => {
              scrollRef.current.scrollTo({y: 0, animated: true})
              setCurrentPage(val)
            }}
            selectedValue={currentPage} />
          : null
        }
        <View style={{height: 50}} />
      </LoadingWrapper>
    </ScrollView>
  )
}
