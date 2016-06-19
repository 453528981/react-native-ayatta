import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Platform,
    StatusBar,
} from 'react-native';

import styles from './style';
import Button from './button';

const ButtonShape = {
    title: PropTypes.string.isRequired,
    style: PropTypes.any,
    handler: PropTypes.func,
};

const TitleShape = {
    title: PropTypes.string.isRequired,
    tintColor: PropTypes.string,
};

const StatusBarShape = {
    style: PropTypes.oneOf(['light-content', 'default',]),
    hidden: PropTypes.bool,
    tintColor: PropTypes.string,
    hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none',]),
    showAnimation: PropTypes.oneOf(['fade', 'slide', 'none',])
};

function customizeStatusBar(data) {
    if (Platform.OS === 'ios') {
        if (data.style) {
            StatusBar.setBarStyle(data.style);
        }
        const animation = data.hidden ?
            (data.hideAnimation || NavigationBar.defaultProps.statusBar.hideAnimation) :
            (data.showAnimation || NavigationBar.defaultProps.statusBar.showAnimation);

        StatusBar.showHideTransition = animation;
        StatusBar.hidden = data.hidden;
    }
}

export default class NavigationBar extends Component {
    componentDidMount() {
        customizeStatusBar(this.props.statusBar);
    }

    componentWillReceiveProps(props) {
        customizeStatusBar(this.props.statusBar);
    }

    getButtonElement(data = {}, containerStyle) {
        return (
            <View style={[styles.navBarButtonContainer, containerStyle,]}>
                {(data && !!data.props) ? data : null}
            </View>
        );
    }

    getTitleElement(data) {
        if (!!data.props) {
            return <View style={styles.customTitle}>{data}</View>;
        }

        const colorStyle = data.tintColor ? { color: data.tintColor, } : null;

        return (
            <View style={styles.navBarTitleContainer}>
                { data.title }
            </View>
        );
    }

    render() {
        const customTintColor = this.props.tintColor ?
            { backgroundColor: this.props.tintColor } : null;

        const customStatusBarTintColor = this.props.statusBar.tintColor ?
            { backgroundColor: this.props.statusBar.tintColor } : null;

        let statusBar = null;

        if (Platform.OS === 'ios') {
            statusBar = !this.props.statusBar.hidden ?
                <View style={[styles.statusBar, customStatusBarTintColor,]} /> : null;
        }

        return (
            <View style={[styles.navBarContainer, customTintColor,]}>
                {statusBar}
                <View style={[styles.navBar, this.props.style]}>
                    {this.getButtonElement(this.props.leftButton, { justifyContent: 'flex-start' }) }
                    {this.getTitleElement(this.props.title) }
                    {this.getButtonElement(this.props.rightButton, { justifyContent: 'flex-end' }) }
                </View>
            </View>
        );
    }

    static propTypes = {
        tintColor: PropTypes.string,
        statusBar: PropTypes.shape(StatusBarShape),
        leftButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
        rightButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
        ]),
        title: PropTypes.oneOfType([
            PropTypes.shape(TitleShape),
            PropTypes.element,
        ]),
    };

    static defaultProps = {
        statusBar: {
            style: 'default',
            hidden: false,
            hideAnimation: 'slide',
            showAnimation: 'slide',
        },
        title: {
            title: '',
        },
    };
}