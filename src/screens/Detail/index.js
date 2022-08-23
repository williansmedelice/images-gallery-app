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
                  style={styles.contImage}
                  source={{ uri: image.urls.regular }}
                >
                  {/* <Text>{image.id}</Text> */}
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
  fontTitle: {
    fontSize: 90,
  },
});
