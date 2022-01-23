import React, {useState} from 'react'
import {ScrollView, View} from 'react-native'
import {Button, Card, Paragraph} from 'react-native-paper'
import Spinner from '../components/Spinner'
import TextInput from '../components/TextInput'
import {useBricksetCollection, useFetchBricksetCollection, useLogin, useLogOut} from '../api/brickset'
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
        fetchBricksetCollection = useFetchBricksetCollection()
  return (
    <ScrollView style={{padding: 20}}>
      <Spinner visible={Boolean(loadingMessage)} textContent={loadingMessage} />
      <RequireAPISupport>
        <Card>
          <Card.Title title="Brickset" />
          <Card.Content>
            {isLoggedIn
              ? <View>
                <Paragraph style={{marginBottom: 20}}>
                    Found {Object.keys(collection || {}).length.toLocaleString()} sets you have tracked on Brickset. Any changes
                    you make in this app will be automatically synced back to Brickset as long as you remain logged in.
                </Paragraph>
                <Button icon="sync" mode="contained" style={{marginBottom: 20}} onPress={() => {
                  setLoadingMessage('Syncing collection from Brickset ...')
                  fetchBricksetCollection()
                    .then(() => setLoadingMessage(''))
                    .catch(() => setLoadingMessage(''))
                }}>
                  Re-sync my collection
                </Button>
                <Button icon="logout" mode="contained" onPress={() => {
                  setLoadingMessage('Logging out from Brickset ...')
                  logOut()
                    .then(() => setLoadingMessage(''))
                    .catch(() => setLoadingMessage(''))
                }}>
                  Log out
                </Button>
              </View>
              : <View>
                <Paragraph style={{marginBottom: 10}}>
                  Log into your{' '}
                  <TextLink url="https://www.brickset.com">Brickset.com</TextLink>{' '}
                  account to access your personal data. If you don&apos;t already have one, you&apos;ll need to{' '}
                  <TextLink url="https://brickset.com/signup">create an account</TextLink>.
                </Paragraph>
                <TextInput label="Username" onChangeText={setUsername} style={{marginBottom: 10}} autoComplete={true} />
                <TextInput label="Password" secureTextEntry={true} onChangeText={setPassword} style={{marginBottom: 10}} autoComplete={false} />
                <Button mode="contained" icon="login" onPress={() => {
                  setLoadingMessage('Logging in to Brickset ...')
                  login(username, password)
                    .then(() => {
                      setLoadingMessage('Importing collection from Brickset ...')
                      fetchBricksetCollection()
                        .then(() => setLoadingMessage(''))
                        .catch(() => setLoadingMessage(''))
                    })
                    .catch(() => setLoadingMessage(''))
                }}>
                  Login
                </Button>
              </View>
            }
          </Card.Content>
        </Card>
      </RequireAPISupport>
    </ScrollView>
  )
}
