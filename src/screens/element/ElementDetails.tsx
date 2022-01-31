import React from 'react'
import {ScrollView, Linking, ActivityIndicator, View} from 'react-native'
import {Button, Card, Paragraph} from 'react-native-paper'
import {RootStackScreenProps} from '../../navigation/types'
import {useGetElementByPartAndColor} from '../../data/elements'
import colors from '../../data/colors'
import TextLink from '../../components/TextLink'
import {usePart} from '../../data/parts'
import ElementImage from '../../components/ElementImage'

export default function ElementDetails({navigation}: RootStackScreenProps<'Element'>) {
  const {routes, index} = navigation.getState(),
        getElementByPartAndColor = useGetElementByPartAndColor(),
        part = usePart(routes[index].params.partNum),
        color = colors[routes[index].params.colorId],
        element = getElementByPartAndColor(routes[index].params.partNum, routes[index].params.colorId)
  return <ScrollView style={{padding: 20}}>
    {element
      ? <View>
        <ElementImage style={{marginBottom: 20}} width={192} id={element.id} />
        <Card style={{marginBottom: 20}}>
          <Card.Title title={`${part.name}`} />
          <Card.Content>
            <Paragraph>Element ID: {element.id}</Paragraph>
            <Paragraph>
              Part Number:{' '}
              <TextLink onPress={() => navigation.navigate('Part', {id: part.partNum})}>
                {part.partNum}
              </TextLink>
            </Paragraph>
            <Paragraph>Color: {color.name}</Paragraph>
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
              Linking.openURL(`https://rebrickable.com/parts/${part.partNum}/something/${color.id}/`)
            }>
              Rebrickable
            </Button>
            <Button onPress={() =>
              Linking.openURL(`https://www.bricklink.com/v2/catalog/catalogitem.page?P=${part.partNum}&idColor=` + colors[color.id].brickLink.id)
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
