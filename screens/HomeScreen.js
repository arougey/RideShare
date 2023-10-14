import React from "react";
import { Image, StyleSheet, Text, View , SafeAreaView} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavorites from "../components/NavFavorites";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View>
        <Image 
            style={{
              margin: 10,
              width: 100, 
              height:100, 
              resizeMode: 'contain',
            }}
          source={require('../assets/uber.png')}
        />
        <GooglePlacesAutocomplete
          onPress={(data, details=null) => {
            dispatch(
              setOrigin({
              location: details.geometry.location,
              description: data.description
            })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          minLength={2}
          enablePoweredByContainer={false}
          styles={{
            container: {
              flex:0,
            },
            textInput: {
              fontSize:18,
            },
          }}
          placeholder="Where From?"
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
      </View>
      <NavOptions/>
      <NavFavorites/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
});