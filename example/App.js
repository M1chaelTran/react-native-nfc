import React, {Component} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import NFC from 'react-native-nfc'

const reactNativeNfc = 'REACT-NATIVE-NFC'
export default class App extends Component {
  state = {
    type: '',
    id: '',
    description: '',
    techList: '',
    start: false,
    nfcAvailable: false,
    nfcEnabled: false,
  }

  async componentDidMount() {
    const getNfcAvailable = NFC.isNfcAvailable()
    const getNfcEnabled = NFC.isNfcEnabled()
    await Promise.all(getNfcAvailable, getNfcEnabled)
    this.setState({
      nfcAvailable: await getNfcAvailable,
      nfcEnabled: await getNfcEnabled,
    })
  }

  start = async () => {
    if (this.state.nfcAvailable) {
      NFC.addListener(reactNativeNfc, payload => {
        console.log('payload', payload)
        const {type, techList, id, description} = payload.data
        this.setState({type, techList, id, description})
      })
      this.setState({start: true, nfcEnabled: await NFC.isEnabled()})
    }
  }

  stop = async () => {
    if (this.state.nfcAvailable) {
      NFC.removeListener(reactNativeNfc)
      this.setState({start: false, nfcEnabled: await NFC.isEnabled()})
    }
  }

  render() {
    const {
      type,
      techList,
      id,
      description,
      start,
      nfcAvailable,
      nfcEnabled,
    } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          React Native NFC
        </Text>
        <View style={styles.info}>
          <Text style={styles.block}>
            Started: {start ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.block}>
            NFC Available: {nfcAvailable ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.block}>
            NFC Enabled: {nfcEnabled ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.block}>
            ID: {id}
          </Text>
          <Text style={styles.block}>
            TYPE: {type}
          </Text>
          <Text style={styles.block}>
            DESCRIPTION: {description}
          </Text>
          <Text style={styles.block}>
            TECH: {techList}
          </Text>
        </View>
        {nfcAvailable &&
          <View>
            <View style={styles.button}>
              <Button title="Start" onPress={this.start} />
            </View>
            <View style={styles.button}>
              <Button title="Stop" onPress={this.stop} />
            </View>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  block: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  info: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    width: 200,
  },
})
