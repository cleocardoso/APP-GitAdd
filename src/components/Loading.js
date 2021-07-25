import React from 'react'
import { View, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native'

export function Loading({lottie}) {
    console.log(lottie)
    return (
        <View style={styles.container}>
            <View style={styles.load}> 
                <LottieView
                    source={lottie}
                    autoPlay loop
                />
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    load: {
        width: '200',
        height: '100',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20',
        marginBottom: '30'
    }
})