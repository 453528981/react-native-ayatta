import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const IconSize = 32;
const IconName = 'ios-arrow-round-back';


class BackButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={ () => { } }>
                <Icon
                    name={ IconSize }
                    size={ IconSize }
                    style={ styles }
                    />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    marginLeft: 10,
    marginRight: 10,
    color: 'rgba(0,0,0,0.8)',
});