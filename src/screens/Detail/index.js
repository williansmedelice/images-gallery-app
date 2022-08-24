import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions
import { searchImg } from "../../store/slices/imagesSlice";

export default function Detail() {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // State Redux
  const images = useSelector((state) => state.images.dataImages);

  // State
  const [transition, setTransition] = useState({
    type: "fadeOutDownBig",
    duration: "200",
  });

  useEffect(() => {
    const searchImages = () => {
      const idImg = route.params.idImg;
      dispatch(searchImg(idImg));
    };
    searchImages();
  }, [route.params]);

  //fadeOutDownBig
  //fadeInUpBig

  const showDetail = () => {
    if (transition.type == "fadeOutDownBig") {
      setTransition({ type: "fadeInUpBig", duration: "500" });
    } else {
      setTransition({ type: "fadeOutDownBig", duration: "200" });
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" duraton="500">
        <ScrollView horizontal pagingEnabled>
          {images.map((image, i) => {
            return (
              <Pressable key={i} onPress={() => showDetail()}>
                <ImageBackground
                  style={[styles.contImage, styles.footer]}
                  source={{ uri: image.urls.regular }}
                >
                  {/* <Text>{image.id}</Text> */}
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.headerCont}
                  >
                    <AntDesign
                      style={styles.fontClose}
                      name="closecircleo"
                      size={40}
                      color="white"
                    />
                  </Pressable>

                  <Animatable.View
                    animation={transition.type}
                    duraton={transition.duration}
                  >
                    <View style={styles.footerDescription}>
                      <Text style={styles.fontTitle}>{image.user.name}</Text>
                      <Text style={styles.fontLike}>{image.likes} Likes</Text>
                      <View style={styles.contDescription}>
                        <TouchableOpacity
                          style={styles.contDescription}
                          onPress={() => console.log("press")}
                        >
                          <View>
                            <Image
                              style={styles.avatarCont}
                              source={{ uri: image.user.profile_image.medium }}
                            />
                          </View>
                          <View>
                            <Text style={styles.fontNameUser}>
                              {image.user.name}
                            </Text>

                            <Text style={styles.fontViewProfile}>
                              View Profile
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Animatable.View>
                </ImageBackground>
              </Pressable>
            );
          })}
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  footer: {
    justifyContent: "flex-end",
  },
  footerDescription: {
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerCont: {
    position: "absolute",
    top: 20,
    marginLeft: 15,
    padding: 10,
  },
  fontTitle: {
    fontSize: 35,
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    color: "white",
    fontWeight: "bold",
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MuseoSans700",
  },
  fontLike: {
    fontSize: 15,
    marginTop: 2,
    marginLeft: 10,
    color: "white",
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MuseoSans300",
  },
  avatarCont: {
    marginLeft: 10,
    marginTop: 15,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  contDescription: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  fontNameUser: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: "white",
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MuseoSans700",
  },
  fontViewProfile: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: 5,
    color: "white",
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MuseoSans300",
  },
  fontClose: {
    padding: 5,
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MuseoSans300",
  },
});
