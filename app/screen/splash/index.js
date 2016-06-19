import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    DrawerLayoutAndroid
} from 'react-native';
import {
    ApiCcnfig
} from '../config';
import {
    ApiClient,
    LocalStorage
} from './common';

export class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cover: null,
            bounceValue: new Animated.Value(1)
        };
    }
    componentDidMount() {
        this.loadCover();
        this.state.bounceValue.setValue(1);
        Animated.timing(
            this.state.bounceValue,
            {
                toValue: 1.2,
                duration: 5000,
            }
        ).start();
    }
    loadCover() {
        LocalStorage.load({
            key: 'SplashCover',
            autoSync: true,
            // syncInBackground(default true) means if data expired,
            // return the outdated data first while invoke the sync method.
            // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
            syncInBackground: true
        }).then(result => {
            console.log(result);
            this.setState({ cover: result });            
        }).catch(err => {
            console.error(err);
        }).done();
    }
    render() {
        var img, text;
        if (this.state.cover) {
            img = { uri: this.state.cover.img };
            text = this.state.cover.text;
        } else {
            img = require('image!splash');
            text = '';
        }

        return (
            <View style={styles.container}>
                <Animated.Image
                    source={img}
                    style={{
                        flex: 1,
                        width: WINDOW_WIDTH,
                        height: 1,
                        transform: [
                            { scale: this.state.bounceValue },
                        ]
                    }} />
                <Text style={styles.text}>
                    {text}
                </Text>
                <Image style={styles.logo} source={require('image!splash_logo') } />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    cover: {
        flex: 1,
        width: 200,
        height: 1,
    },
    logo: {
        resizeMode: 'contain',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        height: 54,
        backgroundColor: 'transparent',
    },
    text: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        backgroundColor: 'transparent',
    }
});
