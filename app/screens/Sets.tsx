import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, ViewPropTypes } from 'react-native'
import sortBy from 'sort-by'
import { Picker, Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import sets from '../data/sets.json'

export default function TabsScreen({ navigation }: RootTabScreenProps<'Sets'>) {
  const [sortField, setSortField] = useState('setNum'),
        [numToShow, setNumToShow] = useState(25)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.filterBar}>
          <Picker
            selectedValue={sortField}
            onValueChange={(field: string) => setSortField(field)}>
            <Picker.Item label="Sort by Set Number" value="setNumSort" />
            <Picker.Item label="Sort by Set Number (desc)" value="-setNumSort" />
            <Picker.Item label="Sort by Name" value="num" />
            <Picker.Item label="Sort by Name (desc)" value="-num" />
            <Picker.Item label="Sort by Year Released" value="year" />
            <Picker.Item label="Sort by Year Released (desc)" value="-year" />
          </Picker>
          <Picker
            selectedValue={numToShow}
            onValueChange={(num: string) => setNumToShow(parseInt(num))}>
            <Picker.Item label="Show 10 per page" value="10" />
            <Picker.Item label="Show 25 per page" value="25" />
            <Picker.Item label="Show 50 per page" value="50" />
            <Picker.Item label="Show 100 per page" value="100" />
          </Picker>
        </View>
        {sets
          .sort(sortBy(sortField))
          .slice(0, numToShow)
          .map(set =>
            <View key={set.setNum} style={styles.theme}>
              <Image
                style={styles.image}
                source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}} />
              <View>
                <Text>{set.setNum}</Text>
                <Text>{set.name}</Text>
                <Text>{set.year}</Text>
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
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
    flexDirection: 'column'
  }
})
