import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../Layout";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    console.log(status);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
}


const CameraScreen = () => {
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    getPermissionAsync();
  }, [])
  const _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled && "uri" in result) {
      setPhoto(result.uri);
    }
  };

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Take a photo" onPress={_pickImage} />
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </Layout>
  );
};

export default CameraScreen;
