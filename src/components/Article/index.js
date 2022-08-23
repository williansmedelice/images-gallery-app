import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Article = ({ newStyle, image }) => {
  // Hooks
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Detail", { idImg: image.id })}
      style={newStyle}
    >
      <View style={newStyle}>
        <ImageBackground
          style={styles.footer}
          imageStyle={styles.imageSt}
          source={{ uri: image.urls.regular }}
        >
          <View style={styles.footerDescription}>
            <Text style={styles.fontTitle}>{image.user.name}</Text>
            <Text style={styles.fontLike}>{image.likes} Likes</Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default Article;

const styles = StyleSheet.create({
  fontTitle: {
    fontSize: 15,
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
    fontSize: 12,
    marginTop: 2,
    marginLeft: 10,
    color: "white",
    textShadowColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "MuseoSans300",
  },
  footer: {
    width: "100%",
    height: 280,
    marginVertical: 5,
    justifyContent: "flex-end",
  },
  footerDescription: {
    height: 70,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  imageSt: {
    borderRadius: 10,
  },
});
