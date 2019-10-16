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
