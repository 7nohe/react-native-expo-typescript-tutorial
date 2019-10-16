import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen/HomeScreen";
import FavoriteScreen from "./FavoriteScreen/FavoriteScreen";
import CameraScreen from "./CameraScreen/CameraScreen";

const AppNavigator = createSwitchNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Favorite: {
      screen: FavoriteScreen
    },
    Camera: {
      screen: CameraScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
