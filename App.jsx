import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {captureScreen} from 'react-native-view-shot';

const {height} = Dimensions.get('window');

function App() {
  const [savedImagePath, setSavedImagePath] = useState('uri');
  const [imageURI, setImageURI] = useState('');

  const takeScreenShot = () => {
    captureScreen({
      format: 'png',
      quality: 0.3,
    }).then(
      uri => {
        setSavedImagePath(uri);
        setImageURI(uri);
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Screenshot App</Text>
        <TouchableOpacity
          style={{
            width: 300,
            height: 300,
            borderWidth: 1,
            borderColor: 'blue',
            borderRadius: 200,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: imageURI ? '#3e43df' : '#fff',
          }}
          onPress={takeScreenShot}>
          {imageURI ? (
            <Image
              source={{uri: imageURI}}
              style={{
                width: 250,
                height: 250,
                resizeMode: 'contain',
              }}
            />
          ) : (
            <View>
              <Text style={styles.textStyle}>Take Screenshot</Text>
              <Text style={styles.textStyle}>Press Me</Text>
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={[styles.textStyle, {color: 'grey'}]}>
            Your Screenshot url is
          </Text>

          <Text style={styles.textLinkStyle}>
            {savedImagePath ? ` ${savedImagePath}` : ''}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500',
    color: '#3e43df',
  },
  textStyle: {
    textAlign: 'center',
    padding: 5,
    color: '#3e43df',
    fontSize: 15,
  },
  textLinkStyle: {
    textAlign: 'center',
    padding: 10,
    color: 'blue',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
