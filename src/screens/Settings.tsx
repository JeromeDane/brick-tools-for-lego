import React, {useState} from 'react'
import {StyleSheet, Button, ScrollView} from 'react-native'
import {Text, TextInput, View} from '../components/Themed'
import Spinner from '../components/Spinner'
import {useBricksetCollection, useLoadCollection, useLogin, useLogOut} from '../api/brickset'
import {useIsLoggedInToBrickset} from '../api/brickset'
import TextLink from '../components/TextLink'
import RequireAPISupport from '../components/APISupport'

export default function SettingsScreen() {
  const [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [loadingMessage, setLoadingMessage] = useState(''),
        collection = useBricksetCollection(),
        login = useLogin(),
        logOut = useLogOut(),
        isLoggedIn = useIsLoggedInToBrickset(),
        loadCollection = useLoadCollection()
  return (
    <ScrollView style={{padding: 20}}>
      <Spinner visible={Boolean(loadingMessage)} textContent={loadingMessage} />
      <Text style={styles.heading}>Brickset</Text>
      <RequireAPISupport>
        {isLoggedIn
          ? <View>
            <Text style={{marginBottom: 20}}>
              Found {Object.keys(collection || {}).length.toLocaleString()} sets you have tracked on Brickset. Any changes
              you make in this app will be automatically synced back to Brickset as long as you remain logged in.
            </Text>
            <View style={{marginBottom: 20}}>
              <Button
                title="Re-sync my collection from Brickset" onPress={() => {
                  setLoadingMessage('Syncing collection from Brickset ...')
                  loadCollection()
                    .then(() => setLoadingMessage(''))
                    .catch(() => setLoadingMessage(''))
                }}/>
            </View>
            <Button title="Log out from Brickset" onPress={() => {
              setLoadingMessage('Logging out from Brickset ...')
              logOut()
                .then(() => setLoadingMessage(''))
                .catch(() => setLoadingMessage(''))
            }} />
          </View>
          : <View>
            <Text style={{marginBottom: 10}}>
              Log into your{' '}
              <TextLink url="https://www.brickset.com">Brickset.com</TextLink>{' '}
              account to access your personal data. If you don&apos;t already have one, you&apos;ll need to{' '}
              <TextLink url="https://brickset.com/signup">create an account</TextLink>.
            </Text>
            <TextInput label="username" onChangeText={setUsername} style={{marginBottom: 10}} />
            <TextInput label="password" secureTextEntry={true} onChangeText={setPassword} style={{marginBottom: 10}} />
            <Button title="Login" onPress={() => {
              setLoadingMessage('Logging in to Brickset ...')
              login(username, password)
                .then(() => {
                  setLoadingMessage('Importing collection from Brickset ...')
                  loadCollection()
                    .then(() => setLoadingMessage(''))
                    .catch(() => setLoadingMessage(''))
                })
                .catch(() => setLoadingMessage(''))
            }}/>
          </View>
        }
      </RequireAPISupport>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  linkText: {
    color: '#2e78b7'
  },
  heading: {
    marginBottom: 20,
    fontWeight: 'bold'
  }
})
