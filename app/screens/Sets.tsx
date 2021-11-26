import React from 'react'
import { Image, ScrollView, StyleSheet, ViewPropTypes } from 'react-native'
import sortBy from 'sort-by'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import sets from '../data/sets.json'

export default function TabsScreen({ navigation }: RootTabScreenProps<'Sets'>) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {sets
          .sort(sortBy('name'))
          .slice(100, 125)
          .map(set =>
            <View key={set.setNum} style={styles.theme}>
              <Image
                style={styles.image}
                source={{uri: `https://images.brickset.com/sets/images/${set.setNum}.jpg`}} />
              <Text>
                {set.name} ({set.setNum})
              </Text>
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20
  },
  theme: {
    textAlign: 'left',
    paddingVertical: 10,
    paddingRight: 20
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'gray'
  }
})
