import React, {useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import axios from "axios";
import CustomButton from "../../components/CustomButton";

const HomeScreen = ({navigation}) => {
  const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=faaba85728afe12fc19258764ebfc04d';
  const apiurl = 'https://api.themoviedb.org/3/search/movie?api_key=faaba85728afe12fc19258764ebfc04d';
  const actorSearchUrl = 'https://api.themoviedb.org/3/search/person?api_key=faaba85728afe12fc19258764ebfc04d'
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Julie Movies</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5C6AC4',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 70,
      paddingHorizontal: 20
    },
    title: {
      color: '#FFF',
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
      backgroundColor: '#FFF',
      borderRadius: 8,
      marginBottom: 20
    },
  }
)
export default HomeScreen;