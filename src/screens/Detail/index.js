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

  useEffect(() => {
    const searchImages = () => {
      const idImg = route.params.idImg;
      dispatch(searchImg(idImg));
    };
    searchImages();
  }, [route.params]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.fontTitle}>Detail</Text>
      <Button title="Back" onPress={() => navigation.goBack()} /> */}
      <Animatable.View animation="fadeIn" duraton="500">
        <ScrollView horizontal pagingEnabled>
          {images.map((image, i) => {
            return (
              <Pressable key={i} onPress={() => console.log("Press")}>
                <ImageBackground
                  style={[styles.contImage, styles.footer]}
                  source={{ uri: image.urls.regular }}
                >
                  {/* <Text>{image.id}</Text> */}
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.headerCont}
                  >
                    <AntDesign name="closecircleo" size={40} color="white" />
                  </Pressable>

                  <View style={styles.footerDescription}>
                    <Text style={styles.fontTitle}>{image.user.name}</Text>
                    <Text style={styles.fontLike}>{image.likes} Likes</Text>
                  </View>
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
});
