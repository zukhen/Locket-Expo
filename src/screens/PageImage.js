import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { images } from "../../assets/images";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    image:
      "https://media.discordapp.net/attachments/915666803701739522/1168893791625826345/image.png?ex=65536c2c&is=6540f72c&hm=a1aa679c79f1f1b49a109ec2967b1ca5f07b8d2fd4d6e8e1a22b003ec2a41480&=&width=698&height=461",
    title: "hehehehehe",
    name: "John",
  },
  {
    id: 2,
    image:
      'https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/396515285_869529941276183_8557372246224519446_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mvWShWCsHQ4AX_uvKk2&_nc_ht=scontent.fhan3-2.fna&oh=00_AfA5BAaQhTzuJ5BpbNP44Kz2bxqE7lmRzbxovVK-qrEuaQ&oe=65458398',
    title: "best image",
    name: "Gia Linh",
  },
  {
    id: 3,
    image:
      'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/395555107_359486943087381_7311652443109833030_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SgNybNgaqJoAX_Mojhc&_nc_ht=scontent.fhan4-3.fna&oh=00_AfBkswuv61NkQhiIGmlWEYP6kSHqDhQmQSgAR32HhsEekg&oe=6545628E',
    name: 'sad girl',
  },
];

const PageImage = ({ backPagePress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    }]}>
      {/* top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={backPagePress}>
          <Image
            source={images.up}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.title}>All Image</Text>
        <View style={styles.spaceHolder}></View>
      </View>

      <PagerView
        style={styles.pagerView}
        scrollEnabled={true}
        orientation="vertical"
      >
        {data.map((item) => (
          <View
            key={item.id}
            style={styles.pageContainer}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito-ExtraBold',
  },
  spaceHolder: {
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: widthScreen,
    height: widthScreen * 1.1,
    borderRadius: 60,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  nameContainer: {
    backgroundColor: '#1F2937',
    marginVertical: 16,
    paddingHorizontal: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    paddingHorizontal: 8,
  },
});

export default PageImage;
