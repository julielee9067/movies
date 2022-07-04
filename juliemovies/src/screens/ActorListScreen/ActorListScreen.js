import React from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import axios from "axios";

const ActorListScreen = ({navigation, route}) => {
  const searchMovies = (id) => {
    axios('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=faaba85728afe12fc19258764ebfc04d').then(({data}) => {
      let results = data.cast;
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
});
export default ActorListScreen;
