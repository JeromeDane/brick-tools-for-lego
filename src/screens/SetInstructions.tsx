import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs'
import React, {useEffect, useState} from 'react'
import {ScrollView, Button} from 'react-native'
import WebView from 'react-native-webview'
import {Text, View} from '../components/Themed'
import {SetTabsParamList} from '../navigation/SetTabs'
import {useSets} from '../data/sets'
import {useApi} from '../api/brickset'

export default function SetInstructionsScreen({route: {params: {id}}}: MaterialTopTabScreenProps<SetTabsParamList, 'SetDetails'>) {
  const set = useSets().byId[id],
        [instructions, setInstructions] = useState(null),
        [downloadUrl, setDownloadUrl] = useState(''),
        [error, setError] = useState(false),
        api = useApi()
  useEffect(() => {
    api('getInstructions2', {setNumber: id})
      .then(response => {
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
    : <Text>Unable to find set number &quot;{id}&quot;</Text>
}
