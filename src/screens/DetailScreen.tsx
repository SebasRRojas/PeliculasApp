import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  const { top } = useSafeAreaInsets();


  return (
    <ScrollView>
      <View style={{...styles.imageContainer, marginTop: top}}>
        <View style={styles.imageBorder}>
          <Image source={{ uri }} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {
        isLoading
          ? <ActivityIndicator size={50} style={{ marginTop: 20 }} />
          : <MovieDetails movieFull={movieFull!} cast={cast} />
      }


      <View
        style={styles.backButton}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <Icon
            name="arrow-back-outline"
            size={60}
            color="white"
          />
        </TouchableOpacity>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 7,
    elevation: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 10,
    left: 5,
  }
});
