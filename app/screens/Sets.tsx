import React, { useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, ViewPropTypes } from 'react-native'
import sortBy from 'sort-by'
import { Paginator, Picker, Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import sets from '../data/sets.json'

export default function TabsScreen({ navigation }: RootTabScreenProps<'Sets'>) {
  const [sortField, setSortField] = useState('setNum'),
        [pageSize, setPageSize] = useState(25),
        [currentPage, setCurrentPage] = useState(0),
        scrollRef = useRef()

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} style={{padding: 20, paddingBottom: 100}}>
        <View style={styles.filterBar}>
          <Text>Sort by</Text>
          <Picker
            style={{width: 150}}
            prompt="Sort by"
            selectedValue={sortField}
            onValueChange={(field: string) => setSortField(field)}>
            <Picker.Item label="Set Number" value="setNumSort" />
            <Picker.Item label="Set Number (desc)" value="-setNumSort" />
            <Picker.Item label="Name" value="name" />
            <Picker.Item label="Name (desc)" value="-name" />
            <Picker.Item label="Parts" value="numParts" />
            <Picker.Item label="Parts (desc)" value="-numParts" />
            <Picker.Item label="Year Released" value="year" />
            <Picker.Item label="Year Released (desc)" value="-year" />
          </Picker>
          <Text style={{marginLeft: 10}}>Show</Text>
          <Picker
            style={{width: 150}}
            prompt="Show"
            selectedValue={pageSize}
            onValueChange={(num: number) => {
              setCurrentPage(0)
              setPageSize(num)
            }}>
            <Picker.Item label="10 per page" value={10} />
            <Picker.Item label="25 per page" value={25} />
            <Picker.Item label="50 per page" value={50} />
            <Picker.Item label="100 per page" value={100} />
          </Picker>
        </View>
        {sets
          .sort(sortBy(sortField))
          .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
          .map(set =>
            <View key={set.setNum} style={styles.theme}>
              <Image
                style={styles.image}
                source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}} />
              <View>
                <Text>{set.setNum}</Text>
                <Text>{set.name}</Text>
                <Text>{set.numParts.toLocaleString()} parts</Text>
                <Text>Released in {set.year}</Text>
              </View>
            </View>
          )
        }
        <Paginator
          pageSize={pageSize}
          numItems={sets.length}
          onValueChange={val => {
            scrollRef.current?.scrollTo({y: 0, animated: false})
            setCurrentPage(val)
          }}
          selectedValue={currentPage} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  theme: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    paddingVertical: 10,
    paddingRight: 20
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    marginRight: 10
  },
  filterBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
