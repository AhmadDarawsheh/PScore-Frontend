import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { playgrounds } = useAuth();
  useEffect(() => {
    console.log(playgrounds[0]);
  }, []);

  const locations = [
    {
      id: 1,
      title: "Location 1",
      latitude: 32.23257817189633,
      longitude: 35.21605422702873,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Location 2",
      latitude: 32.22210841485003,
      longitude: 35.25456093346338,
      image: "https://via.placeholder.com/150",
    },
  ];
  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const mapViewRef = useRef(null);
  useEffect(() => {
    (async () => {
      // Request permissions for accessing device location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);

      mapViewRef.current.animateToRegion(newRegion);
    })();
  }, []);
  const goToMyLocation = () => {
    mapViewRef.current.animateToRegion({
      ...region,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View className="flex-1">
      {region && (
        <MapView
          ref={mapViewRef}
          style={{ height: 500 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
        >
          {playgrounds.map((location) => (
            <Marker
              key={location._id}
              coordinate={{
                latitude: location.location.coordinates[1],
                longitude: location.location.coordinates[0],
              }}
              title={location.name}
              onPress={() => handleMarkerPress(location)}
            ></Marker>
          ))}
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          >
            <Image
              source={require("../../assets/images/markerBlue.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      )}
      <Button title="Go to my Location" onPress={goToMyLocation} />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedLocation && (
              <>
                <Text style={styles.modalTitle}>{selectedLocation.name}</Text>
                {selectedLocation.photos[0] && (
                  <Image
                    source={{ uri: selectedLocation.photos[0] }}
                    style={{ width: "100%", height: 100 }}
                  />
                )}

                <Text>{selectedLocation.name}</Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() =>
                      navigation.navigate("Stadium", { ...selectedLocation })
                    }
                  >
                    <Text style={styles.closeButtonText}>go to playground</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default MapScreen;
