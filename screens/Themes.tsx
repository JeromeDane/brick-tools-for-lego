import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ViewPropTypes } from 'react-native'
import sortBy from 'sort-by'
import { Text, View } from '../components/Themed'
import { RootDrawerParamList } from '../types'
import themes from '../data/raw/themes.json'

export default function TabsScreen({ navigation }: RootDrawerParamList<'Themes'>) {
  return (
    <ScrollView style={styles.container}>
      {themes
        .filter(({parentId}) => !parentId)
        .sort(sortBy('name'))
        .map(theme =>
          <Text key={theme.id} style={styles.theme}>
            {theme.name} ({theme.numSets} sets)
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
  },
})
