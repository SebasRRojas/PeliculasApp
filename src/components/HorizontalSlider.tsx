/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { MoviePoster } from './MoviePoster';

interface Props {
    title?: string;
    movies: Movie[];
}

export const HorizontalSlider = ({ movies, title }: Props) => {
    return (
        <View style={
            { ...styles.flatlistContainer,
                height: title ? 260 : 220,
            }
        }>

            {
                title && <Text style={styles.title}>{title}</Text>
            }

            <FlatList
                data={movies}
                renderItem={({ item }: any) => (
                    <MoviePoster movie={item} width={140} height={200} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    flatlistContainer: {
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
