import * as React from 'react';
import { StyleSheet, Linking, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import {version} from '../package.json'

import { RootStackScreenProps } from '../types';

export default function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Version {version}</Text>
      <Text style={styles.paragraph}>
        This project is free, open source, and maintained by volunteers out of a love of all things LEGO®. If you would like to get involved, please check out the{' '}
        <Text style={styles.linkText}
              onPress={() => Linking.openURL('https://github.com/JeromeDane/brick-tools-for-lego/')}>
          project on GitHub
        </Text>.
      </Text>
      <Text style={styles.paragraph}>
        Show your ❤️ and support for this project and help keep it alive:
      </Text>
      <View style={styles.paragraph}>
        <Button
          title="Make a donation"
          onPress={() => Linking.openURL('https://www.paypal.com/donate?hosted_button_id=LWSCPL34NZ6LJ')} />
      </View>
      <Text style={styles.paragraph}>
        Author:{' '}
        <Text style={styles.linkText}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/JeromeDane/')}>
          Jerome Dane
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        Powered by data from{' '}
        <Text style={styles.linkText}
              onPress={() => Linking.openURL('https://rebrickable.com/downloads/')}>
          Rebrickable.com
        </Text>
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
