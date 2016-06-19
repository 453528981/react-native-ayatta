import React, { Component } from 'react';
import {View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatButton from './FloatButton';
import styles from 'style';

const scrollButtonIcon = "ios-arrow-round-up";
const scrollButtonIconSize = 32;

class ScrollButton extends Component {

    constructor(props) {
        super(props);
    }

    renderButtonContent() {
        return (
            <View>
                <Icon name= { scrollButtonIcon }
                    size={ scrollButtonIconSize }
                    style={ styles.icon }
                    />
                    <Text>{this.props.count}</Text>
            </View>
        );
    }

    render() {
        return (
            <FloatButton onPress = { this.props.onPress } style={ this.props.style }>
                { this.renderButtonContent() }
            </FloatButton>
        );
    }
}
