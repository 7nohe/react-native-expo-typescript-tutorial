## React


### Component, JSX

https://reactjs.org/tutorial/tutorial.html



### Hooks

https://qiita.com/uhyo/items/246fb1f30acfeb7699da





## TypeScript



### Playground

https://www.typescriptlang.org/play/index.html



### Interface vs Type Alias

https://qiita.com/tkrkt/items/d01b96363e58a7df830e





## React Native

https://facebook.github.io/react-native/docs/tutorial



### 誰が使ってる？

https://facebook.github.io/react-native/showcase.html



## Expo

https://expo.io/tools



### Expoのつよみ

https://tech.maricuru.com/entry/2018/04/09/142341



### Expoのつらみ

https://tech.maricuru.com/entry/react-native-advent-calendar-2018



### Snack

https://snack.expo.io/





### SDK

https://docs.expo.io/versions/v35.0.0/sdk/overview/



参考: react-native-camera https://react-native-community.github.io/react-native-camera/docs/installation



### Tips

https://qiita.com/kaba/items/03053d3b9ab356e00557



## expo init

```bash
$ expo init MyApp
```



- Template: expo-template-blank-typescript
- Package Manager: npm



```bash
$ npm run start
```



## Install native base

Native Base: https://nativebase.io/



```bash
$ npm install native-base
$ expo install expo-font
```



## Create Layout



```tsx
// src/Layout.tsx
import React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Icon
} from "native-base";

interface IProps {
  children: React.ReactNode;
}

const Layout = (props: IProps) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>My App</Title>
        </Body>
      </Header>
      <Content>{props.children}</Content>
      <Footer>
        <FooterTab>
          <Button
          >
            <Icon name="home" />
          </Button>
          <Button
          >
            <Icon name="camera" />
          </Button>
          <Button
          >
            <Icon name="bookmark" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default Layout;

```



```tsx
// App.tsx
import React from 'react';
import { Text } from 'react-native';
import Layout from './src/Layout'

export default function App() {
  return (
    <Layout >
      <Text>Hello Expo!</Text>
    </Layout>
  );
}

```



## Fetching remote data



```tsx
// src/components/CardList.tsx

import React, { useContext } from "react";
import {
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { Image } from "react-native";

export interface Photo {
  download_url: string;
  id: string;
  author: string;
}

interface IProps {
  photos: Photo[];
}

const CardList = (props: IProps) => {
  return (
    <>
      {props.photos.map(photo => (
        <Card key={photo.id}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: `https://na.ui-avatars.com/api/?name=${photo.author.replace(
                    "¥s",
                    "+"
                  )}`
                }}
              />
              <Body>
                <Text>My Image</Text>
                <Text note>{photo.author}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: photo.download_url }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
              >
                <Icon active name="thumbs-up" />
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      ))}
    </>
  );
};

export default CardList;

```



```tsx
// src/HomeScreen/HomeScreen.tsx

import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import CardList from "../components/CardList";
import { Spinner } from "native-base";

// 画像読み込み
const getPhotos = () => {
  return fetch("https://picsum.photos/v2/list")
    .then(res => res.json())
    .catch(err => console.error(err));
};

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unmounted = false;
    const init = async () => {
      const photos = await getPhotos();
      if (!unmounted) {
        setLoading(false);
        setPhotos(photos);
      }
    };
    init();

    // clean up function
    return () => {
      unmounted = true;
    };
  }, [photos]);
  const content = loading ? <Spinner /> : <CardList photos={photos} />;
  return <Layout>{content}</Layout>;
};

export default HomeScreen;

```



```tsx
// App.tsx

import React from 'react';
import HomeScreen from './src/HomeScreen/HomeScreen'
export default function App() {
  return (
    <HomeScreen />
  );
}

```



## Navigation

React Navigation: https://reactnavigation.org/



Stack Navigator: https://reactnavigation.org/docs/en/stack-navigator.html

Switch Navigator: https://reactnavigation.org/docs/en/switch-navigator.html

```bash
$ expo install react-navigation react-native-gesture-handler react-native-reanimated
```





```tsx
// src/FavoriteScreen/FavoriteScreen.tsx

import React, { useContext } from "react";
import Layout from "../Layout";
import CardList from "../HomeScreen/CardList";
import { FavoriteContext } from "./FavoriteContext";

const FavoriteScreen = () => {
  const { favorites } = useContext(FavoriteContext);
  return (
    <Layout>
      <CardList photos={favorites} />
    </Layout>
  );
};

export default FavoriteScreen;

```



```tsx
// src/CameraScreenn/CameraScreen.tsx

import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../Layout";

const CameraScreen = () => {
  const [photo, setPhoto] = useState(null);

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

```



```typescript
// src/AppContainer.ts

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

```



```tsx
// App.tsx

import React from 'react';
import AppContainer from './src/AppContainer'
export default function App() {
  return (
    <AppContainer/>
  );
}

```





```typescript
// src/hooks/useNavigation.ts

import { useContext } from "react";
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext
} from "react-navigation";

export function useNavigation<Params>() {
  return useContext(NavigationContext) as NavigationScreenProp<
    NavigationRoute,
    Params
  >;
}

```



```tsx
// src/Layout.tsx

import React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Icon
} from "native-base";
import { useNavigation } from "./hooks/useNavigation";

interface IProps {
  children: React.ReactNode;
}

const Layout = (props: IProps) => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <Body>
          <Title>My App</Title>
        </Body>
      </Header>
      <Content>{props.children}</Content>
      <Footer>
        <FooterTab>
          <Button
            onPress={() => {
              navigation.navigate("Home");
            }}
            active={navigation.state.routeName === "Home"}
          >
            <Icon name="home" />
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Camera");
            }}
            active={navigation.state.routeName === "Camera"}
          >
            <Icon name="camera" />
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Favorite");
            }}
            active={navigation.state.routeName === "Favorite"}
          >
            <Icon name="bookmark" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default Layout;

```





## Camera



ImagePicker: https://docs.expo.io/versions/v35.0.0/sdk/imagepicker/



```bash
$ expo install expo-image-picker expo-constants expo-permissions
```



```tsx
// src/CameraScreenn/CameraScreen.tsx

import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../Layout";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
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

```



## State Management



Context API: 

https://ja.reactjs.org/docs/context.html

https://qiita.com/kaba/items/50126e874b24ff984471



useContext: https://ja.reactjs.org/docs/hooks-reference.html#usecontext



```ts
// src/AppContext.ts

import React from "react";
import { Photo } from "./components/CardList"

interface IState {
  favorites: Photo[],
  setFavorites: (favorites: Photo[]) => void
}

export const AppContext = React.createContext<IState>({
  favorites: [],
  setFavorites: () => {}
});

```



```typescript
// App.tsx

import React, { useState } from 'react';
import AppContainer from './src/AppContainer'
import { AppContext } from './src/AppContext'

export default function App() {
  const [favorites, setFavorites] = useState([]);
  return (
    <AppContext.Provider value={{ favorites, setFavorites }}>
      <AppContainer/>
    </AppContext.Provider>
  );
}

```



```tsx
// src/FavoriteScreen/FavoriteScreen.tsx

import React, { useContext } from "react";
import Layout from "../Layout"
import CardList from '../components/CardList'
import { AppContext } from '../AppContext'

const FavoriteScreen = () => {
  const { favorites } = useContext(AppContext);
  return (
    <Layout>
      <CardList photos={favorites} />
    </Layout>
  );
};

export default FavoriteScreen;

```



```tsx
// src/components/CardList.tsx

import React, { useContext } from "react";
import {
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { Image } from "react-native";
import { AppContext } from "../AppContext"

export interface Photo {
  download_url: string;
  id: string;
  author: string;
}

interface IProps {
  photos: Photo[];
}

const CardList = (props: IProps) => {
  const { favorites, setFavorites } = useContext(AppContext);
  return (
    <>
      {props.photos.map(photo => (
        <Card key={photo.id}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: `https://na.ui-avatars.com/api/?name=${photo.author.replace(
                    "¥s",
                    "+"
                  )}`
                }}
              />
              <Body>
                <Text>My Image</Text>
                <Text note>{photo.author}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: photo.download_url }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={() => {
                  favorites.push(photo);
                  setFavorites(favorites);
                }}
              >
                <Icon active name="thumbs-up" />
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      ))}
    </>
  );
};

export default CardList;

```





