import * as React from 'react';
import { StyleSheet, Linking, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import TextLink from '../components/TextLink'
import {version} from '../package.json'

import { RootStackScreenProps } from '../types';

export default function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This project is free and maintained by out of a love of all things LEGO®.{' '}
        <TextLink url="mailto:jerome.dane@gmail.com">
          Send me an email
        </TextLink>{' '}
        if you have feedback or would like to get involved, {' '}
      </Text>
      <Text style={styles.paragraph}>
        Show your ❤️ for this project:
      </Text>
      <View style={styles.paragraph}>
        <Button
          title="Make a donation"
          onPress={() => Linking.openURL('https://www.paypal.com/donate?hosted_button_id=LWSCPL34NZ6LJ')} />
      </View>
      <Text style={styles.paragraph}>
        Author:{' '}
        <TextLink url="https://www.linkedin.com/in/JeromeDane/">
          Jerome Dane
        </TextLink>
      </Text>
      <Text style={styles.paragraph}>Version {version}</Text>
      <Text style={styles.paragraph}>
        Powered by data from{' '}
        <TextLink url="https://www.brickset.com/">Brickset.com</TextLink>
        {' '}and{' '}
        <TextLink url="https://www.rebrickable.com/">Rebrickable.com</TextLink>
      </Text>
      <Text style={styles.paragraph}>LEGO® is a trademark of the LEGO Group of companies which does not sponsor, authorize or endorse this project.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  linkText: {
    color: '#2e78b7',
  },
  paragraph: {
    marginBottom: 20,
    textAlign: 'center'
  }
});
