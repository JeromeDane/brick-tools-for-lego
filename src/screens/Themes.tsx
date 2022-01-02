import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {sortBy} from 'sort-by-typescript'
import {Text} from '../components/Themed'
import themes from '../data/raw/themes.json'

export default function TabsScreen() {
  return (
    <ScrollView style={styles.container}>
      {themes
        .filter(({parentId}) => !parentId)
        .sort(sortBy('name'))
        .map(theme =>
          <Text key={theme.id} style={styles.theme}>
            {theme.name} (
            {theme.yearFrom ? '' + theme.yearFrom + '' : ''}
            {theme.yearTo ? '-' + theme.yearTo + '' : ''}
            {(theme.yearFrom || theme.yearTo) ? ', ' : ''}
            {theme.numSets} sets)
          </Text>
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  theme: {
    textAlign: 'left',
    paddingVertical: 10
  }
})
