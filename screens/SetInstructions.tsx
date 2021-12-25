import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import React, {useEffect, useState} from 'react';
import { ScrollView, Button, } from 'react-native';
import WebView from 'react-native-webview'
import { Text, View } from '../components/Themed';
import { SetTabsParamList } from '../navigation/SetTabs'
import sets from '../data/sets'
import brickset from '../api/brickset'

export default function SetInstructionsScreen({ route: {params: {id}}}: MaterialTopTabScreenProps<SetTabsParamList, 'SetDetails'>) {
  const set = sets[id],
        [instructions, setInstructions] = useState(null),
        [downloadUrl, setDownloadUrl] = useState(''),
        [error, setError] = useState(false)
  useEffect(() => {
    brickset('getInstructions2', {setNumber: id})
      .then(response => {
        console.log(response?.instructions)
        setInstructions(response?.instructions)
      })
      .catch(() => setError(true))
  }, [set])
  return set
    ? <ScrollView style={{padding: 20}}>
      {error
        ? <Text>An error occured while loading instructions.</Text>
        : null
      }
      {(instructions && instructions.length == 0)
        ? <Text>No instructions found.</Text>
        : null
      }
      {instructions?.map(instruction =>
        <View style={{marginVertical: 10}} key={instruction.url}>
          <Button
            disabled={instruction.URL === downloadUrl}
            onPress={() => {
              setDownloadUrl(instruction.URL)
              setTimeout(() => setDownloadUrl(''), 500)
            }}
            title={instruction.description} />
        </View>
      )}
      {downloadUrl
        ? <WebView style={{display: 'none'}} source={{uri: downloadUrl}} />
        : null
      }
    </ScrollView>
    : <Text>Unable to find set number "{id}"</Text>
}