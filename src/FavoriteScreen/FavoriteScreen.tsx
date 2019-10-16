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
