import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';

import styles from 'style';

const activeOpacity = 0.6;

class FloatButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity = { activeOpacity }
                onPress={ this.props.onPress } style={[styles.container, styles.positionRight, this.props.style]}>
                { this.props.children }
            </TouchableOpacity>
        );
    }
}

