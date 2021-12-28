import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import sortBy from 'sort-by'
import { Paginator, Picker, Text, TextInput, View } from '../components/Themed'
import ScaledImage from '../components/ScaledImage'
import { RootTabScreenProps } from '../types'
import {setsList} from '../data/sets'
import {themesList} from '../data/themes'

export default function TabsScreen({ navigation: {navigate} }: RootTabScreenProps<'Sets'>) {
  const [sortField, setSortField] = useState('-year'),
        [pageSize, setPageSize] = useState(25),
        [filterBy, setFilterBy] = useState(''),
        [theme, setTheme] = useState(''),
        [currentPage, setCurrentPage] = useState(0),
        scrollRef = useRef(),
        filteredSets = setsList.filter(set =>
          (!filterBy || (set.setNum + set.name).toLowerCase().match(filterBy.toLowerCase())) &&
          (!theme || set.theme.id == theme)
        )
  return (
    <ScrollView ref={scrollRef} style={{
      padding: 20,
      paddingBottom: 100,
    }}>
      <View>
        <TextInput
          label="Search Sets"
          onChangeText={value => {
            setCurrentPage(0)
            setFilterBy(value)
          }} />
      </View>
      <View style={{
        marginBottom: 20,
        marginTop: 20
      }}>
        <Picker
          label="Theme"
          prompt="Theme"
          selectedValue={theme}
          onValueChange={(theme: string) => {
            setCurrentPage(0)
            setTheme(theme)
          }}>
          <Picker.Item label="All themes" value="" />
          {themesList.sort(sortBy('name')).map(theme =>
            <Picker.Item key={theme.name} label={`${theme.name} (${theme.numSets.toLocaleString()} sets)`} value={theme.id} />
          )}
        </Picker>
      </View>
      <View style={{marginBottom: 20}}>
        <Picker
          label="Sort by"
          prompt="Sort by"
          selectedValue={sortField}
          onValueChange={(field: string) => {
            setCurrentPage(0)
            setSortField(field)
          }}>
          <Picker.Item label="Set Number" value="setNumSort" />
          <Picker.Item label="Set Number (desc)" value="-setNumSort" />
          <Picker.Item label="Most Owned" value="-ownedBy" />
          <Picker.Item label="Most Wanted" value="-wantedBy" />
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Name (desc)" value="-name" />
          <Picker.Item label="Parts" value="numParts" />
          <Picker.Item label="Parts (desc)" value="-numParts" />
          <Picker.Item label="Retail Price" value="-LEGOCom.US.retailPrice" />
          <Picker.Item label="Retail Price (desc)" value="-LEGOCom.US.retailPrice" />
          <Picker.Item label="Year Released" value="year" />
          <Picker.Item label="Year Released (desc)" value="-year" />
        </Picker>
      </View>
      {filteredSets.length
        ? filteredSets
          .sort(sortBy.apply(sortBy, sortField.split(',')))
          .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
          .map(set =>
            <TouchableOpacity key={set.setNum} style={styles.set} onPress={() => {
              navigate('Set', {id: set.setNum})
            }}>
              <ScaledImage
                style={styles.image}
                width={100}
                source={{uri: set.image.imageURL}} />
              <View>
                <Text>{set.setNum}</Text>
                <Text>{set.name}</Text>
                <Text>{set.theme.name}</Text>
                <Text>{set.numParts.toLocaleString()} parts</Text>
                <Text>
                  Released in {set.year}
                  {set.LEGOCom.US.retailPrice ?
                    ` - $${set.LEGOCom.US.retailPrice.toLocaleString()} USD`
                    : ''
                  }
                </Text>
                {sortField == '-ownedBy'
                  ? <Text>Owned by {set.ownedBy.toLocaleString()} people on Brickset</Text>
                  : null
                }
                {sortField == '-wantedBy'
                  ? <Text>Wanted by {set.wantedBy.toLocaleString()} people on Brickset</Text>
                  : null
                }
              </View>
            </TouchableOpacity>
          )
        : <Text style={{textAlign: 'center'}}>
          No results match your search criteria
        </Text>
      }
      <View style={{height: 20}} />
      {filteredSets.length
        ? <Paginator
            pageSize={pageSize}
            numItems={filteredSets.length}
            onPageSizeChange={setPageSize}
            onPageChange={(val : number) => {
              scrollRef.current?.scrollTo({y: 0, animated: true})
              setCurrentPage(val)
            }}
            selectedValue={currentPage} />
        : null
      }
      <View style={{height: 50}} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  nowrapRow: {
    flex: 1,
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap'
  },
  set: {
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
