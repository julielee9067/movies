import React, {useState} from "react";
import {Image, StyleSheet, TextInput, View} from "react-native";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../../assets/Logo.png";

const HomeScreen = ({navigation}) => {
  const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=faaba85728afe12fc19258764ebfc04d';
  const apiurl = 'https://api.themoviedb.org/3/search/movie?api_key=faaba85728afe12fc19258764ebfc04d';
  const actorSearchUrl = 'https://api.themoviedb.org/3/search/person?api_key=faaba85728afe12fc19258764ebfc04d'
  const favoriteUrl = 'http://localhost:5000/get-favorites/'
  const multiSearchUrl = 'https://api.themoviedb.org/3/search/multi?api_key=faaba85728afe12fc19258764ebfc04d'
  const [state, setState] = useState({
    s: "Enter a movie title",
    genre: 'Search by genre',
    actor: 'Enter name of the actor',
  });

  const search = () => {
    axios(apiurl + '&query=' + state.s).then(({data}) => {
      let results = data.results;
      navigation.navigate('MovieList', {
        results: results,
      });
    })
  }

  const searchGenre = () => {
    axios(genreUrl).then(({data}) => {
      let results = data.genres;
      navigation.navigate('GenreList', {
        results: results,
      });
    })
  }

  const searchActor = () => {
    axios(actorSearchUrl + '&query=' + state.actor).then(({data}) => {
      let results = data.results;
      navigation.navigate('ActorList', {
        results: results,
      });
    })
  }

  const showFavorites = async () => {
    const userId = await AsyncStorage.getItem('userId');
    axios(favoriteUrl + userId).then(({data}) => {
      navigation.navigate('FavoriteMovieList', {
        results: data,
      });
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.searchbox}
        onChangeText={text => setState((prevState => {
          return {...prevState, s: text}
        }))}
        onSubmitEditing={search}
        value={state.s}
      />
      <TextInput
        style={styles.searchbox}
        onChangeText={text => setState((prevState => {
          return {...prevState, actor: text}
        }))}
        onSubmitEditing={searchActor}
        value={state.actor}
      />
      <CustomButton
        text={state.genre}
        onPress={searchGenre}
      />
      <CustomButton
        text='See favorite movies'
        onPress={showFavorites}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 70,
      paddingHorizontal: 20
    },
    title: {
      color: '#5C6AC4',
      fontSize: 32,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20
    },
    searchbox: {
      fontSize: 20,
      fontWeight: '300',
      padding: 20,
      width: '100%',
      backgroundColor: '#D3D3D3',
      borderRadius: 8,
      marginBottom: 20
    },
  }
)
export default HomeScreen;