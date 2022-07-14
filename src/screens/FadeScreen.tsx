/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Button, View } from 'react-native';
import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {
    const {opacity, fadeIn, fadeOut} = useFade();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Animated.View
                style={{
                    backgroundColor: '#084F6A',
                    width: 150,
                    height: 150,
                    borderColor: 'white',
                    borderWidth: 10,
                    opacity,
                    marginBottom: 10,
                }}
            />

            <Button
                title="Fade in"
                onPress={ fadeIn }
            />
            <Button
                title="Fade out"
                onPress={ fadeOut }
            />
        </View>
    );
};
