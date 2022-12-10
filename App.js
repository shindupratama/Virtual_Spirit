/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { FlatList, Image, LogBox, SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Card, CardItem, Text, Button, Left, Body, Right, Root, Toast } from 'native-base';

let DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    like: 0
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    uri: "https://www.holidify.com/images/cmsuploads/compressed/03_Alternative-Central-Park-3_20190103162831.jpg",
    like: 0
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    uri: "https://www.holidify.com/images/cmsuploads/compressed/03_20181011190905.jpg",
    like: 0
  },
];

class App extends Component {
  state = {refresh: false}

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']); 
  }

  render() {
  return (
    <>
    <Root>
      <StatusBar backgroundColor={'#fff'}/>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
      <View>
        <View style={styles.direction}>
          <Left>
            <Button primary onPress={() => {
                  for (let i = 0; i < DATA.length; i++) {
                    DATA[i].like += 1;
                  }
                  this.setState({refresh: !this.state.refresh});
                }}>
              <Text>Like All</Text>
            </Button>
          </Left>
          <Body>
            <Button bordered dark onPress={() => {
                  for (let i = 0; i < DATA.length; i++) {
                    DATA[i].like = 0;
                  }
                  this.setState({refresh: !this.state.refresh});
                }}>
              <Text>Reset All</Text>
            </Button>
          </Body>
          <Right>
            <Button danger onPress={() => {
                  for (let i = 0; i < DATA.length; i++) {
                    if(DATA[i].like == 0) {
                      return false;
                    } else {
                      DATA[i].like -= 1;
                      this.setState({refresh: !this.state.refresh});
                    }
                  }
                }}>
              <Text>Dislike All</Text>
            </Button>
          </Right>
        </View>
        <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
          <Card>
            <CardItem cardBody>
              <Image source={{uri: item.uri}} style={styles.image}/>
            </CardItem>
            <CardItem>
              <Left>
                  <Button bordered dark>
                    <Text>{item.like} Like</Text>
                  </Button>
              </Left>
              <Right style={styles.right}>
                <Button primary style={styles.primary} onPress={() => {
                  item.like += 1;
                  this.setState({refresh: !this.state.refresh});
                }}>
                  <Text>Like</Text>
                </Button>
                <Button danger style={styles.danger} onPress={() => {
                  if(item.like == 0) {
                    Toast.show({
                      text: "Like is 0, you can't dislike",
                      type: 'danger',
                      position: "bottom",
                      duration: 2000
                  });
                  return false;
                  }
                  item.like -= 1;
                  this.setState({refresh: !this.state.refresh});
                }}>
                  <Text>Dislike</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          </View>
        )}
        keyExtractor={item => item.id}
        extraData={this.state.refresh}
      />
          </View>
        </ScrollView>
      </SafeAreaView>
      </Root>
    </>
  );
        }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  card: {
    flex: 1,
    margin: 10
  },
  right: {
    flexDirection: 'row'
  },
  body: {
    backgroundColor: Colors.white,
  },
  primary: {
    borderRadius: 7, 
    marginRight: 10
  },
  danger: {
    borderRadius: 7
  },
  direction: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    height: 200, width: null, flex: 1
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
