import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions
import { addImages } from "../../store/slices/imagesSlice";
// Components
import Loader from "../../components/Loader";
import Article from "../../components/Article";

export default function Home() {
  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // State Redux
  const images = useSelector((state) => state.images.dataImages);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        "https://api.unsplash.com/photos/?client_id=a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa"
      );

      const result = await response.json();

      dispatch(addImages(result));
    };

    fetchImages();
  }, []);

  return (
    <>
      {!images ? (
        <Loader />
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.contHeader}>
            <TouchableOpacity
              onPress={() => console.log("Press")}
              style={styles.headerCont}
            >
              <Ionicons name="ios-menu" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Animatable.View animation="bounceIn" duraton="500">
                <Text style={styles.fontHeader}>Discover</Text>
              </Animatable.View>
            </View>
          </View>
          <ScrollView style={styles.scrollStyle}>
            <View style={styles.container}>
              <Animatable.View animation="fadeIn" duraton="500">
                <View style={styles.list}>
                  {images.map((image, i) => {
                    let newStyle =
                      i % 2 === 0 ? styles.listItem : styles.listItemMarginTop;
                    return (
                      <Article key={i} newStyle={newStyle} image={image} />
                    );
                  })}
                </View>
              </Animatable.View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  mainContainer: {
    backgroundColor: "white",
  },
  contHeader:{
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 5,
  },
  scrollStyle: {
    // padding: 5,
  },
  headerTitle: {
    flex: 1,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  fontHeader: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "MuseoSans700",
  },
  contenedor: {},
  footer: {
    width: "100%",
    height: 280,
    marginVertical: 5,
    justifyContent: "flex-end",
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
  headerCont: {
    width: 50,
    padding: 10,
  },
});
