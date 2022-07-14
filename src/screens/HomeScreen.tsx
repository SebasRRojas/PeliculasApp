/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext);

    const getPosterColors = async (index: number) => {
        const uri = `https://image.tmdb.org/t/p/w500${nowPlaying[index].poster_path}`;

        const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

        setMainColors({
            primary,
            secondary,
        });

    };

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0);
        }
    }, [nowPlaying]);


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="red" size={100} />
            </View>
        );
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>

                    {/* Carousel */}
                    <View style={{
                        height: 440,
                    }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={(index) => getPosterColors(index)}
                        />
                    </View>

                    {/* Popular movies */}
                    <HorizontalSlider movies={popular} title="Popular" />
                    <HorizontalSlider movies={topRated} title="Top rated" />
                    <HorizontalSlider movies={upcoming} title="Upcoming" />

                </View>
            </ScrollView>
        </GradientBackground>
    );
};
