import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
// Components
import Loader from "../../components/Loader";
import ArticleView from "../../components/ArticleView";

export default function Profile() {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();

  // Stateß
  const [userData, setUserData] = useState(null);
  const [userPhotoData, setUserPhotoData] = useState(null);

  useEffect(() => {
    const searchUser = () => {
      let url = `https://api.unsplash.com/users/${route.params.user}/?client_id=a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa`;

      let urlImgUser = `https://api.unsplash.com/users/${route.params.user}/photos/?client_id=a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((e) => console.log(e));

      fetch(urlImgUser)
        .then((response) => response.json())
        .then((data) => setUserPhotoData(data))
        .catch((e) => console.log(e));
    };

    searchUser();
  }, [route.params]);

  return (
    <>
      {!userData ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {/* <Text style={styles.fontTitle}>Profile</Text>
          <Text>{route.params.user}</Text>
          <Button title="Back" onPress={() => navigation.goBack()} /> */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.headerCont}
          >
            <AntDesign
              style={styles.fontClose}
              name="closecircleo"
              size={30}
              color="white"
            />
          </Pressable>
          <Animatable.View animation="fadeInLeftBig" duraton="500">
            <View style={styles.contDescription}>
              <View style={styles.contAvatar}>
                <Image
                  style={styles.avatarCont}
                  source={{ uri: userData.profile_image.medium }}
                />
              </View>
              <View style={styles.contProfile}>
                <Text style={styles.fontNameUser}>{userData.name}</Text>
                <Text style={styles.fontViewBio}>{userData.bio}</Text>
              </View>
            </View>
          </Animatable.View>
          <Animatable.View animation="fadeInRight" duraton="500">
            <View style={styles.contHead1}>
              <Text style={styles.fontHead1}>My Photos</Text>
            </View>
          </Animatable.View>
          <View style={styles.contList}>
            <ScrollView>
              <View style={styles.container}>
                <Animatable.View animation="fadeIn" duraton="500">
                  {userPhotoData && (
                    <View style={styles.list}>
                      {userPhotoData.map((image, i) => {
                        let newStyle =
                          i % 2 === 0
                            ? styles.listItem
                            : styles.listItemMarginTop;
                        return (
                          <ArticleView
                            key={i}
                            newStyle={newStyle}
                            image={image}
                          />
                        );
                      })}
                    </View>
                  )}
                </Animatable.View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  contDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  contAvatar: {
    flex: 1,
  },
  contProfile: {
    flex: 3,
    marginLeft: 10,
  },
  contList: {
    marginTop: 10,
    flex: 3,
  },
  avatarCont: {
    marginLeft: 10,
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#aaaaaa",
  },
  fontNameUser: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "MuseoSans700",
  },
  fontViewBio: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "MuseoSans300",
  },
  contHead1: {
    marginTop: 15,
  },
  fontHead1: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "MuseoSans700",
    marginLeft: 15,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listItem: {
    flexBasis: "48%",
  },
  listItemMarginTop: {
    flexBasis: "48%",
    marginTop: 15,
  },
  headerCont:{
    
    width: 50,
  },
  fontClose: {
    padding: 10,
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
