import React from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import axios from "axios";

const GenreListScreen = ({navigation, route}) => {
  const genreUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=faaba85728afe12fc19258764ebfc04d';
  const searchMovies = (id) => {
    axios(genreUrl + '&with_genres=' + id).then(({data}) => {
      let results = data.results;
      navigation.navigate('MovieList', {
        results: results,
      });
    });
  }

  return (
    <ScrollView style={styles.results}>
      {route.params.results.map(result => {
        return (
          <TouchableHighlight
            key={result.id}
            onPress={() => searchMovies(result.id)}
          >
            <View style={styles.result}>
              <Text style={styles.heading}>{result.name}</Text>
            </View>
          </TouchableHighlight>
        )
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    height: 25,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20
  },
  result: {
    flex: 1,
    width: '100%',
  },
  heading: {
    color: '#5C6AC4',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#FFF'
  },
  popup: {
    padding: 20,
    marginTop: 40
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    backgroundColor: '#2484c4'
  }
});
export default GenreListScreen;
