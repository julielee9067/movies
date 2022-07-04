import React from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

const ActorListScreen = () => {
  const navigation = useNavigation();

  const openPopup = (id) => {
    axios('https://api.themoviedb.org/3/movie/' + id + '?api_key=faaba85728afe12fc19258764ebfc04d').then(({data}) => {
      let result = data;
      setState(prevState => {
        return {...prevState, selected: result}
      });
    });
  }

  return (
    <ScrollView style={styles.results}>
      {state.actorResults.map(result => {
        return (
          <TouchableHighlight
            key={result.id}
            onPress={() => openPopup(result.id)}
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
  container: {
    flex: 1,
    backgroundColor: '#223343',
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
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
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
export default ActorListScreen;
