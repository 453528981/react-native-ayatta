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
import Util from '../../util';
import {ApiCcnfig} from '../../config';
import {ApiClient, LocalStorage} from '../../common';

import NavigationBar from '../component/navbar/';

export class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    onMenuPress() {
        this.drawer && this.drawer.openDrawer();
    }

    closeDrawer() {
        this.drawer && this.drawer.closeDrawer();
    }

    renderNavigationView() {
        let { router } = this.props;
        return (
            <DrawerPanel router={ router } hideDrawerFunc={ this.closeDrawer.bind(this) }/>
        );
    }

    renderHeaderLeftConfig() {
        return (
            <TouchableOpacity onPress={ this.onMenuPress.bind(this) }>
                <Icon
                    name='ios-menu'
                    size={22}
                    style={ CommonStyles.navbarMenu }
                    />
            </TouchableOpacity>
        )
    }

    renderHeaderRightConfig() {
        return (
            <TouchableOpacity onPress={ this.onSearchPress.bind(this) }>
                <Icon
                    name='ios-search'
                    size={22}
                    style={ CommonStyles.navbarMenu }
                    />
            </TouchableOpacity>
        )
    }

    renderHeaderTitleConfig() {
        return (
            <Text style={ CommonStyles.navbarText }>
                { headerText }
            </Text>
        )
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={ (ref) => { this.drawer = ref } }
                drawerWidth={ Util.Screen.Width - 80 }
                keyboardDismissMode="on-drag"
                drawerPosition={ DrawerLayoutAndroid.positions.Left }
                renderNavigationView={ this.renderNavigationView.bind(this) }>

                <View style={ CommonStyles.container }>
                    <NavigationBar
                        style = { CommonStyles.navbar}
                        leftButton= { this.renderHeaderLeftConfig() }
                        rightButton = { this.renderHeaderRightConfig() }
                        title={ this.renderHeaderTitleConfig() }>
                    </NavigationBar>


                </View>
            </DrawerLayoutAndroid>
        );
    }
}