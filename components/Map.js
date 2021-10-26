import React, { useState, useEffect, Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const markersUrl =
  'https://www.letsroam.com/coding-challenge-endpoint?password=81j2jj210a9';

const mapStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    return fetch(
      'https://www.letsroam.com/coding-challenge-endpoint?password=81j2jj210a9'
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>LOADING</Text>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={mapStyle.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={mapStyle.map}
            initialRegion={{
              latitude: 38.89860153,
              longitude: -77.03649902,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {this.state.dataSource.map((val, index) => {
              if (val.lat_long) {
                let latlong = val.lat_long.split(',');

                let Url = '';
                switch (val.hunt_type) {
                  case 'ghostHunt':
                    Url = 'https://www.letsroam.com/ghost_tours/' + val.url;
                    break;
                  case 'barHunt':
                    Url = 'https://www.letsroam.com/bar_hunt/' + val.url;
                    break;
                  case 'zooHunt':
                    Url = 'https://www.letsroam.com/zoo_activity/' + val.url;
                    break;
                  case 'artHunt':
                    Url = 'https://www.letsroam.com/art_walk/' + val.url;
                    break;
                  case 'inHome':
                    Url = 'https://www.letsroam.com/roam_from_home/' + val.url;
                    break;
                  case 'uniHunt':
                    Url = 'https://www.letsroam.com/scavenger_hunt/' + val.url;
                    break;
                  case 'scavaHunt':
                    Url = 'https://www.letsroam.com/scavenger_hunt/' + val.url;
                    break;

                  default:
                    Url = 'https://www.letsroam.com/scavenger_hunt/' + val.url;
                }

                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(latlong[0]),
                      longitude: parseFloat(latlong[1]),
                    }}
                    onCalloutPress={() => {
                      Linking.openURL(Url);
                    }}
                  >
                    {/* {val.hunt_type === 'barHunt' ? (
                      <Icon name="glass" color="blue" size={30} />
                    ) : null}
                    {val.hunt_type === 'zooHunt' ? (
                      <Icon name="paw" size={30} />
                    ) : null}
                    {val.hunt_type === 'inHome' ? (
                      <Icon name="home" color="red" size={30} />
                    ) : null}
                    {val.hunt_type === 'uniHunt' ? (
                      <Icon name="university" size={30} />
                    ) : null}
                    {val.hunt_type === 'scavaHunt' ? (
                      <Icon name="search" size={30} />
                    ) : null} */}

                    <Callout>
                      <View style={{ width: 240 }}>
                        <Text
                          style={{ fontWeight: 'bold', textAlign: 'center' }}
                        >
                          {val.name}
                        </Text>
                        <Text>{val.description}</Text>
                      </View>
                    </Callout>
                  </Marker>
                );
              }
            })}
          </MapView>
        </View>
      );
    }
  }
}

export default Map;
