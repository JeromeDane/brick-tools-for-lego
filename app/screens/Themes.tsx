import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, ViewPropTypes } from 'react-native'
import sortBy from 'sort-by'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import themes from '../data/themes.json'

export default function TabsScreen({ navigation }: RootTabScreenProps<'Themes'>) {
  return (
    <View style={styles.container}>
      <ScrollView>
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
    paddingVertical: 10
  },
})
