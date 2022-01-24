import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Card, Paragraph} from 'react-native-paper'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import ScaledImage from '../../components/ScaledImage'
import type {Set} from '../../data/types'
import {RootStackParamList} from '../../navigation/types'

type SetPreviewProps = {
  navigation: DrawerNavigationProp<RootStackParamList, 'Sets'>,
  set: Set,
  sortField?: string
}
export default function SetPreview({navigation, set, sortField}: SetPreviewProps) {
  return <Card key={set.setNum} style={styles.set} onPress={() => {
    navigation.navigate('Set', {id: set.setNum})
  }}>
    <Card.Title title={set.name} />
    <Card.Content style={{flexDirection: 'row'}}>
      <ScaledImage
        style={styles.image}
        width={100}
        source={{uri: set.image.imageURL}} />
      <View style={{backgroundColor: 'none'}}>
        <Paragraph>Set number:  {set.setNum}</Paragraph>
        <Paragraph>Theme: {set.theme.name}</Paragraph>
        <Paragraph>Parts: {set.numParts.toLocaleString()}</Paragraph>
        <Paragraph>
          Released in {set.year}
          {set.LEGOCom.US.retailPrice ?
            ` at $${set.LEGOCom.US.retailPrice.toLocaleString()} USD`
            : ''
          }
        </Paragraph>
        {sortField == '-ownedBy'
          ? <Paragraph>Owned by {set.ownedBy.toLocaleString()} people on Brickset</Paragraph>
          : null
        }
        {sortField == '-wantedBy'
          ? <Paragraph>Wanted by {set.wantedBy.toLocaleString()} people on Brickset</Paragraph>
          : null
        }
      </View>
    </Card.Content>
  </Card>
}

const styles = StyleSheet.create({
  set: {
    marginBottom: 20
  },
  image: {
    backgroundColor: 'gray',
    marginRight: 10
  }
})
