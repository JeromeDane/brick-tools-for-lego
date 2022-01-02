import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Text, View} from '../../components/Themed'
import ScaledImage from '../../components/ScaledImage'
import type {Set} from '../../data/types'
import {RootDrawerParamList} from '../../navigation/types'
import {DrawerNavigationProp} from '@react-navigation/drawer'

type SetPreviewProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList, 'Sets'>,
  set: Set,
  sortField: string
}
export default function SetPreview({navigation, set, sortField}: SetPreviewProps) {
  return <TouchableOpacity key={set.setNum} style={styles.set} onPress={() => {
    navigation.navigate('Set', {id: set.setNum})
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
          ` at $${set.LEGOCom.US.retailPrice.toLocaleString()} USD`
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
}

const styles = StyleSheet.create({
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
  }
})
