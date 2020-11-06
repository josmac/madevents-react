import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { profile } from "../../services/api-client";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Profile.css";

const Profile = () => {
  const authContext = useAuthContext();
  const { favoritesData, setFavoritesData } = useFavoritesContext();
  console.log(authContext.user);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await profile(authContext.user.id);
        debugger;
        setFavoritesData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const loadedCard = () => {
    return favoritesData
      ? favoritesData.favorites.map((favorite) => {
          return <ProfileCard favorite={favorite} />;
        })
      : "loading";
  };

  return (
    <div>
      <NavBar />

      <div className="container">
        <div className="mt-4 title">
          <p>Hola! Esta es tu agenda de eventos.</p>
        </div>
        <div className="row mt-4 mb-4">{loadedCard()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
