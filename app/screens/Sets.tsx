import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import sortBy from 'sort-by'
import { Paginator, Picker, Text, TextInput, View } from '../components/Themed'
import Image from '../components/Image'
import { RootTabScreenProps } from '../types'
import sets from '../data/sets.json'

export default function TabsScreen({ navigation }: RootTabScreenProps<'Sets'>) {
  const [sortField, setSortField] = useState('-year'),
        [pageSize, setPageSize] = useState(25),
        [filterBy, setFilterBy] = useState(''),
        [currentPage, setCurrentPage] = useState(0),
        scrollRef = useRef(),
        filteredSets = filterBy
          ? sets.filter(({name, setNum}) => (setNum + name).toLowerCase().match(filterBy.toLowerCase()))
          : sets

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} style={{
        padding: 20,
        paddingBottom: 100,
      }}>
        <TextInput
          label="Search Sets"
          onChangeText={value => {
            setCurrentPage(0)
            setFilterBy(value)
          }} />
        <View style={{
          marginBottom: 20,
          marginTop: 10
        }}>
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
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Name (desc)" value="-name" />
            <Picker.Item label="Parts" value="numParts" />
            <Picker.Item label="Parts (desc)" value="-numParts" />
            <Picker.Item label="Year Released" value="year" />
            <Picker.Item label="Year Released (desc)" value="-year" />
          </Picker>
        </View>
        {filteredSets.length
          ? filteredSets
            .sort(sortBy.apply(sortBy, sortField.split(',')))
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map(set =>
              <View key={set.setNum} style={styles.theme}>
                <Image
                  style={styles.image}
                  width={100}
                  source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}} />
                <View>
                  <Text>{set.setNum}</Text>
                  <Text>{set.name}</Text>
                  <Text>{set.numParts.toLocaleString()} parts</Text>
                  <Text>Released in {set.year}</Text>
                </View>
              </View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nowrapRow: {
    flex: 1,
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap'
  },
  theme: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    paddingVertical: 10,
    paddingRight: 20
  },
  image: {
    backgroundColor: 'gray',
    marginRight: 10
  },
})
