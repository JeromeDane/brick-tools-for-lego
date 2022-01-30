import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import React, {useEffect, useRef, useState} from 'react'
import Carousel from 'react-native-snap-carousel'
import Spinner from '../../components/Spinner'
import {ScrollView, Image, Linking, View, TouchableOpacity} from 'react-native'
import {ActivityIndicator, Button, Card, Paragraph} from 'react-native-paper'
import {Text} from '../../components/Themed'
import ScaledImage from '../../components/ScaledImage'
import {SetTabsParamList} from './SetScreen'
import {fetchSetImages, SetImage} from '../../api/brickset'
import {useSetWanted, useSetOwned} from '../../api/brickset'
import TextLink from '../../components/TextLink'
import CheckBox from '../../components/Checkbox'
import TextInput from '../../components/TextInput'
import {useIsLoggedInToBrickset} from '../../api/brickset'
import {useSet} from '../../data/sets'

export default function SetDetailsScreen({navigation, route: {params: {id}}}: MaterialTopTabScreenProps<SetTabsParamList, 'SetDetails'>) {
  const set = useSet(id),
        carousel = useRef(),
        [loadingMessage, setLoadingMessage] = useState(''),
        [setImages, setSetImages] = useState<SetImage[]>([]),
        [alternateImagesLoaded, setAlternateImagesLoaded] = useState(false),
        [width, setWidth] = useState(0),
        isLoggedInToBrickset = useIsLoggedInToBrickset(),
        [quantityOwned, setQuantityOwned] = useState(
          ((isLoggedInToBrickset && set && set.collection && set.collection.qtyOwned) || 0).toString()
        ),
        setWanted = useSetWanted(),
        setOwned = useSetOwned(),
        images = (set ? [{imageURL: set.image.imageURL, thumbnailURL: set.image.thumbnailURL}] : []).concat(setImages)
  useEffect(() => {
    if(set && set.collection)
      setQuantityOwned(set.collection.qtyOwned.toString())
  }, [set])
  useEffect(() => {
    if(set?.bricksetID)
      fetchSetImages(set?.bricksetID)
        .then(images => {
          setSetImages(images)
          setAlternateImagesLoaded(true)
        })
  }, [set])
  const CarouselItem = ({item}: {item: SetImage, index: number}) => {
    return (
      <ScaledImage
        width={width}
        height={width}
        source={{uri: item.imageURL}}
        style={{flex: 1, width: width, height: width, resizeMode: 'contain', zIndex: 10}} />
    )
  }
  return set
    ? <ScrollView style={{padding: 20}}>
      <Spinner visible={Boolean(loadingMessage)} textContent={loadingMessage} />
      <View onLayout={e => setWidth(e.nativeEvent.layout.width)}>
        {width
          ? <Carousel
            ref={carousel}
            data={images}
            renderItem={CarouselItem}
            sliderWidth={width}
            itemWidth={width} />
          : <ActivityIndicator />
        }
        <ScrollView horizontal={true} style={{marginTop: 5, display: 'flex', flex: 1, flexDirection: 'row', width}}>
          {images.map((image, i: number) =>
            <TouchableOpacity key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              width: 50,
              height: 50,
              marginRight: 5
            }}
            onPress={() => {
              carousel?.current.snapToItem(i)
            }}>
              <Image
                source={{uri: image.imageURL}}
                style={{flex: 1, width: '100%', resizeMode: 'contain', zIndex: 10}} />
              <ActivityIndicator color='#aaaa' style={{position: 'absolute', top: width / 2 - 10, zIndex: 1}} />
            </TouchableOpacity>
          )}
          {alternateImagesLoaded
            ? null
            : <ActivityIndicator color='#aaa' />
          }
        </ScrollView>
      </View>
      <Card style={{marginVertical: 20}}>
        <Card.Title title="Set Details" />
        <Card.Content>
          <Paragraph>Set number: {set.setNum}</Paragraph>
          <Paragraph>Theme: {set.theme.name}</Paragraph>
          <Paragraph>{set.name}</Paragraph>
          <Paragraph>
            {set.numParts.toLocaleString()} parts
            {set.LEGOCom.US.retailPrice ?
              ` - $${(set.LEGOCom.US.retailPrice / set.numParts).toFixed(2)} USD per part`
              : ''
            }
          </Paragraph>
          <Paragraph>
            Released in {set.year}
            {set.LEGOCom.US.retailPrice ?
              ` at $${set.LEGOCom.US.retailPrice.toLocaleString()} USD`
              : ''
            }
          </Paragraph>
          <Paragraph>Owned by {set.ownedBy.toLocaleString()} people on Brickset</Paragraph>
          <Paragraph>Wanted by {set.wantedBy.toLocaleString()} people on Brickset</Paragraph>
        </Card.Content>
      </Card>
      <Card style={{marginBottom: 20}}>
        <Card.Title title="Collection" />
        <Card.Content>
          {isLoggedInToBrickset
            ? <View>
              <View style={{marginBottom: 10}}>
                <CheckBox
                  label="I want this set"
                  value={set.collection.wanted}
                  onValueChange={(newValue) => {
                    setLoadingMessage(`Saving as ${newValue ? '' : 'not '}wanted on Brickset ...`)
                    setWanted(set, newValue)
                      .then(() => setLoadingMessage(''))
                      .then(() => setLoadingMessage(''))
                  }}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <CheckBox
                  label="I own this set"
                  value={set.collection.owned}
                  onValueChange={(newValue) => {
                    setLoadingMessage(`Saving as ${newValue ? '' : 'not '}owned on Brickset ...`)
                    setOwned(set, newValue ? 1 : 0)
                      .then(() => {
                        setQuantityOwned('1')
                        setLoadingMessage('')
                      })
                      .then(() => setLoadingMessage(''))
                  }}
                />
              </View>
              {set.collection.owned
                ? <TextInput
                  label="How many copies do I own?"
                  keyboardType="numeric"
                  autoComplete={false}
                  onChangeText={value => {
                    const int = parseInt(value)
                    if(!value) setQuantityOwned('')
                    else if(isNaN(int)) setQuantityOwned('')
                    else setQuantityOwned(int.toString())
                  }}
                  onBlur={() => {
                    setLoadingMessage(`Saving as ${quantityOwned != '0' ? quantityOwned : 'not'} owned on Brickset ...`)
                    setOwned(set, parseInt(quantityOwned))
                      .then(() => setLoadingMessage(''))
                      .then(() => setLoadingMessage(''))
                  }}
                  value={quantityOwned} />
                : null
              }
            </View>
            : <TextLink
              style={{marginTop: 10}}
              onPress={() => navigation.navigate('Settings')}>
              Log into Brickset to track how of this set many you own.
            </TextLink>
          }
        </Card.Content>
      </Card>
      <Card style={{marginBottom: 20}}>
        <Card.Title title="Links" />
        <Card.Content>
          <Button onPress={() =>
            Linking.openURL('https://brickset.com/sets/' + set.setNum)
          }>
            Brickset
          </Button>
          <Button onPress={() =>
            Linking.openURL('https://rebrickable.com/sets/' + set.setNum)
          }>
            Rebrickable
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
    : <Text>Unable to find set number &quot;{id}&quot;</Text>
}
