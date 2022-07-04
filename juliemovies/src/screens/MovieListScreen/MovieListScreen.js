import React, {useState} from "react";
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import axios from "axios";

const MovieListScreen = ({navigation, route}) => {
  const [state, setState] = useState({
    selected: {}
  });

  const openPopup = (id) => {
    axios('https://api.themoviedb.org/3/movie/' + id + '?api_key=faaba85728afe12fc19258764ebfc04d').then(({data}) => {
      let result = data;
      setState(prevState => {
        return {...prevState, selected: result}
      });
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.results}>
        {route.params.results.map(result => {
          return (
            <TouchableHighlight
              key={result.id}
              onPress={() => openPopup(result.id)}
            >
              <View style={styles.result}>
                <Image
                  source={{uri: 'https://image.tmdb.org/t/p/original' + result.poster_path}}
                  style={{
                    width: '100%',
                    height: 300,
                    resizeMode: 'cover'
                  }}
                />
                <Text style={styles.heading}>{result.title}</Text>
              </View>
            </TouchableHighlight>
          )
        })}
      </ScrollView>
      <Modal
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.title != 'undefined')}
      >
        <View style={styles.popup}>
          <Text style={styles.poptitle}>{state.selected.title}</Text>
          <Text style={{marginBottom: 20}}>Rating: {state.selected.vote_average}</Text>
          <Text>{state.selected.overview}</Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => {
              return {...prevState, selected: {}}
            }
          )}
        >
          <Text style={styles.closeBtn}>Close</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C6AC4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  result: {
    flex: 1,
    width: '100%',
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#5C6AC4'
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
    backgroundColor: '#5C6AC4'
  }
});
export default MovieListScreen;
