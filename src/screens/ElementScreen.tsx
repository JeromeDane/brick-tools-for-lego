import React, {useEffect} from 'react'
import {ScrollView, Image, Linking, ActivityIndicator, View} from 'react-native'
import {Button, Card, Paragraph} from 'react-native-paper'
import {RootStackScreenProps} from '../navigation/types'
import {useElement} from '../data/elements'
import colors from '../data/colors'
import TextLink from '../components/TextLink'

export default function Element({navigation}: RootStackScreenProps<'Element'>) {
  const {routes, index} = navigation.getState(),
        element = useElement(routes[index].params.id)
  useEffect(() => {
    if(element) {
      navigation.setOptions({
        title: `${element.part.name} (${element.color.name})`
      })
    }
  }, [element])
  return <ScrollView style={{padding: 20}}>
    {element
      ? <View>
        <Image
          style={{marginBottom: 20, width: 192, height: 192, backgroundColor: 'gray'}}
          source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
        <Card style={{marginBottom: 20}}>
          <Card.Title title={`${element.part.name}`} />
          <Card.Content>
            <Paragraph>Element ID: {element.id}</Paragraph>
            <Paragraph>
              Part Number:{' '}
              <TextLink onPress={() => navigation.navigate('Part', {id: element.part.partNum})}>
                {element.part.partNum}
              </TextLink>
            </Paragraph>
            <Paragraph>Color: {element.color.name}</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title title="Links" />
          <Card.Content>
            <Button onPress={() =>
              Linking.openURL(`https://brickset.com/parts/${element.id}/`)
            }>
              Brickset
            </Button>
            <Button onPress={() =>
              Linking.openURL(`https://www.bricklink.com/v2/catalog/catalogitem.page?P=${element.part.partNum}&idColor=` + colors[element.color.id].brickLink.id)
            }>
              BrickLink
            </Button>
          </Card.Content>
        </Card>
      </View>
      : <ActivityIndicator color="#aaa" />
    }
  </ScrollView>
}
