import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import HomeHeader from '../../../components/Headers/HomeHeader';
import { useTranslation } from 'react-i18next';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import styles from './styles';
import Input from '../../../components/Input';
import AppButton from '../../../components/AppButton';
import { GOOGLE_MAPS_APIKEY } from '../../../utils/axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors, Spacings, width, height, ScaleHeight } from '../../../common/foundation';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapSearch from './MapSearch';
import axios from 'axios';
import IMAGES from '../../../common/images';


const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.155 * ASPECT_RATIO;
const LON_DELTA = 0.155 * ASPECT_RATIO;

const Map = (props: any) => {
  const { t } = useTranslation();

  const comeFrom = props?.route?.params?.comeFrom;
  const type = props?.route?.params?.type;
  const item = props?.route?.params?.item;
  const restaurantDetails = props?.route?.params?.restaurantDetails;



  const map = useRef(null);
  const sheetRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 33.8735578,
    longitude: 35.84741,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LON_DELTA,
  });


  const [isSelectedNewLocation, setIsSelectedNewLocation] = useState(false);
  const [locationUser, setLocationUser] = useState({});
  const [adderssDetails, setAddressDetails] = useState({})


  useEffect(() => {
    requestPermissions()
    if (type == 'edit') {
      setLocationUser({
        latitude: item?.LATITUDE,
        longitude: item?.LONGITUDE,
        address: item?.MAP_LOCATION_ADDRESS,
      });

      setRegion({
        latitude: item?.LATITUDE,
        longitude: item?.LONGITUDE,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LON_DELTA,
      });

    } else {
      getLocation();

    }
  }, []);

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Tekram',
            'message': 'Tekram App access to your location '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
        } else {
          console.log("location permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  const getLocation = async () => {

    Geolocation.getCurrentPosition(
      async info => {

        Geocoder.init(GOOGLE_MAPS_APIKEY);
        let json = await Geocoder.from(
          info.coords.latitude,
          info.coords.longitude,
        );
        setLocationUser({
          latitude: Math.round(info.coords.latitude * 100) / 100,
          longitude: Math.round(info.coords.longitude * 100) / 100,
          address: json.results[0].formatted_address,
        });

        setRegion({
          latitude: parseFloat(Math.round(info.coords.latitude * 100) / 100),
          longitude: parseFloat(Math.round(info.coords.longitude * 100) / 100),
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA,
        });

        getCurrentLocationAddress({
          latitude: parseFloat(Math.round(info.coords.latitude * 100) / 100),
          longitude: parseFloat(Math.round(info.coords.longitude * 100) / 100),
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA,
        })

      },
      error => {
        console.log(JSON.stringify(error));
      },
    );
  };

  const getCurrentLocationAddress = async (location: any) => {
    try {
      Geocoder.init(GOOGLE_MAPS_APIKEY); // use a valid API key

      let json = await Geocoder.from(location.latitude, location.longitude);
      console.log('json', json);

      const adderss_components = json.results[0]?.address_components;
      let comp_length = adderss_components?.length;
      let zipCode = '11461';
      let country = 'SA';
      let streetNumber = '1';
      let street = '';

      const filterCity = adderss_components.filter(val => {
        if (
          val?.types?.includes('locality') ||
          val?.types?.includes('sublocality')
        ) {
          return val;
        }

        if (val?.types?.includes('postal_code')) {
          let postalCode = val?.long_name;
          zipCode = postalCode ? postalCode : '11461';
        }

        if (val?.types?.includes('country')) {
          country = val?.short_name ? val?.short_name : 'SA';
        }

        if (val?.types?.includes('street_number')) {
          streetNumber = val?.long_name ? val?.long_name : '1';
        }

        if (val?.types?.includes('route')) {
          street = val?.long_name ? val?.long_name : val?.short_name
        }

        return false;
      });

      const cityObj =
        filterCity?.length > 0
          ? filterCity[0]
          : adderss_components[
          comp_length > 1 ? comp_length - 2 : comp_length - 1
          ];
      let cityName = cityObj?.long_name
        ? cityObj?.long_name?.length > 17
          ? cityObj.short_name
          : cityObj?.long_name
        : 'Riyadh';

      console.log('city name ========= ', cityName);
      console.log('zipcode ========= ', zipCode);
      console.log('country ========= ', country);
      console.log('street number ========= ', streetNumber);
      console.log('street ==== ', street)

      setAddressDetails({
        zipCode: zipCode,
        city: cityName,
        country: country,
        streetNumber: streetNumber,
        street: street
      })

      var address = json.results[0].formatted_address;
      setLocationUser({
        address: address,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onRegionChangeComplete = (e: any) => {
    setRegion({
      latitude: e.latitude,
      longitude: e.longitude,
      latitudeDelta: e.latitudeDelta,
      longitudeDelta: e.longitudeDelta,
    });
    if (e.latitude != region.latitude && e.longitude != region.longitude) {
      getCurrentLocationAddress({
        latitude: e.latitude,
        longitude: e.longitude,
        latitudeDelta: e.latitudeDelta,
        longitudeDelta: e.longitudeDelta,
      });

    }
  };


  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={
            t('address.select')
          }
          onPress={() => {

            props.navigation.replace('AddressForm', {
              comeFrom: comeFrom ? comeFrom : 'default',
              locationUser: locationUser,
              type: type ? type : 'add',
              item: item,
              restaurantDetails: restaurantDetails
            });

          }}
        />
      </View>
    );
  };

  const search = (location: any, details = null) => {
    axios
      .get(
        'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
        location.place_id +
        '&key=' +
        GOOGLE_MAPS_APIKEY,
      )
      .then(data => {
        setLocationUser({
          address: data.data.result.formatted_address,
          latitude: data.data.result.geometry.location.lat,
          longitude: data.data.result.geometry.location.lng,
        });

        setRegion({
          latitude: data.data.result.geometry.location.lat,
          longitude: data.data.result.geometry.location.lng,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA,
        });
        sheetRef.current.close();
      });
  };
  return (
    <View style={styles.container}>
      <HomeHeader title={t('address.selectLocation')} {...props} />
      <TouchableOpacity
        onPress={() => {
          sheetRef.current.open();
        }}
        style={styles.inputContainer}
      >
        <View pointerEvents="none" style={styles.inputContainer}>
          <Input
            placeholder={locationUser?.address ? locationUser?.address : t('address.mapSearchPlaceholder')}
            value={locationUser?.address}
            editable={false}
            placeholderTextColor={locationUser?.address ? Colors.darkBlue : Colors.gray}
            mainStyle={{ width: "95%", height: "100%" }}
            inputStyle={{ width: "95%", height: "100%" }}
          />
        </View>
      </TouchableOpacity>


      <View style={styles.mapContainer}>
        <MapView
          ref={map}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          scrollEnabled
          style={{ height: '100%', width: '100%' }}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={false}

        />


        <Image source={IMAGES.pin} resizeMode='contain' style={styles.pin} />
        <TouchableOpacity
          onPress={() => { getLocation() }}
          style={styles.current_locationButton}>
          <Image source={IMAGES.current_location} resizeMode='contain' style={styles.current_location} />

        </TouchableOpacity>
        <RBSheet
          ref={sheetRef}
          height={height / 2}
          openDuration={250}
          customStyles={{
            container: styles.sheetContainer,
          }}>
          <MapSearch
            onclose={() => sheetRef.current.close()}
            searchHandler={search}
          />
        </RBSheet>

        <Footer />
      </View>
    </View>
  );
};

export default Map;
