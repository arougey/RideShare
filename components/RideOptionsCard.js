import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: '/Users/alexrougebec/Projects/uberclone/assets/supercar.png',
  },
  {
    id: "Uber-XD-456",
    title: "Uber-XL",
    multiplier: 1.2,
    image: '/Users/alexrougebec/Projects/uberclone/assets/supercar.png',
  },
  {
    id:"Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: '/Users/alexrougebec/Projects/uberclone/assets/supercar.png',
  },
]

const surchargerate = 1.5

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation)


  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
          style={[tw`absolute top-3 left-5 p-3 rounded-full`, {zIndex:1}]}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - { travelTimeInformation?.distance.text }</Text>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              item.id === selected?.id && "bg-gray-200"
            }`} 
          >
            <Image 
              style={[{width:100, height:70, resizeMode: "contain"}, tw`-ml-5`]}
              source={{ uri: item.image }}
              />
            <View style={tw`-ml-8`}>
              <Text style={tw`font-bold text-lg`}> { item.title } </Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>

            <Text>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP'
              }).format(
                (travelTimeInformation?.duration.value * surchargerate * item.multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity 
          disabled={!selected} 
          style={tw`bg-black py-3 mb-10 mx-12 rounded-full ${!selected && 'bg-gray-300'}`}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose { selected?.title }</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({})