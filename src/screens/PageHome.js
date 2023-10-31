import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { images } from "../../assets/images/index";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const PageHome = ({ onPressed }) => {
  const insets = useSafeAreaInsets();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(null);
        setSnackbarVisible(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderCamera = () => {
    return (
      <View>
        <View style={styles.camera}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          />
        </View>
        {/* control */}
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}
          >
            <Image
              source={images.flash}
              style={[
                styles.controlIcon,
                { tintColor: flash === Camera.Constants.FlashMode.off ? 'white' : 'yellow' },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={takePicture}
          >
            <View style={styles.cameraButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Image
              source={images.reload}
              style={styles.controlIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <View>
        <Image source={{ uri: image }} style={styles.camera} />
        {/* control */}
        <View style={styles.controlContainer}>
          <TouchableOpacity
            onPress={() => {
              setImage(null);
            }}
          >
            <Image
              source={images.close}
              style={styles.controlIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              setImage(null);
            }}
          >
            <Image
              source={images.send}
              style={styles.controlIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveImage}>
            <Image
              source={images.download}
              style={styles.controlIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <PaperProvider>
      <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: '#000' }}>
        {/* top */}
        <View style={styles.topContainer}>
          <Pressable style={styles.profileButton}>
            <Image
              source={{ uri: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-9/158286235_1355382268148507_3942750498553992743_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7a1959&_nc_ohc=C2pdwUDT2gwAX_U2Mio&_nc_ht=scontent.fhan3-2.fna&oh=00_AfDOzFzy3tOc6vu3VUtI3wuJBTfjIgaBPjpHxhwa-0I2dQ&oe=6568531E' }}
              style={styles.profileImage}
            />
          </Pressable>
          <Pressable style={styles.friendsButton}>
            <Image
              source={images.users}
              style={styles.controlIcon}
            />
            <Text style={styles.friendsText}>9 Friends</Text>
          </Pressable>
          <Pressable style={styles.messageButton}>
            <Image
              source={images.message}
              style={{width:30,height:30,tintColor:'white'}}
            />
          </Pressable>
        </View>
        {/* camera */}
        <View>{!image ? renderCamera() : renderImage()}</View>
        {/* bottom */}
        <View style={styles.bottomContainer}>
          <Pressable style={styles.historyButton} onPress={onPressed}>
            <Text style={styles.historyText}>History</Text>
            <Image
              source={images.down}
              style={styles.historyIcon}
            />
          </Pressable>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          Image saved successfully!
        </Snackbar>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: widthScreen,
    height: widthScreen * 1.1,
    borderRadius: 60,
    overflow: "hidden",
    marginVertical: widthScreen * 0.09,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },
  controlIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  cameraButton: {
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 50,
    padding: 5,
  },
  cameraButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: 'rgba(213, 219, 224, 1)',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  profileButton: {
    backgroundColor: '#4B5563',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40 / 2,
  },
  profileImage: {
    width: 35,
    height: 35,
    overflow: 'hidden',
    borderRadius: 35 / 2,
  },
  friendsButton: {
    backgroundColor: '#4B5563',
    padding: 8,
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  friendsText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Nunito-Bold',
  },
  messageButton: {
    backgroundColor: '#4B5563',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 3,
    alignItems: 'center',
    height: heightScreen / 17,
  },
  bottomContainer: {
    marginVertical: 40,
  },
  historyButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  historyIcon: {
    width: 40,
    height: 40,
    marginTop: 2,
    tintColor: 'white',
  },
});

export default PageHome;
