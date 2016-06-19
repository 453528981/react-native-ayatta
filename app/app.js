import React from 'react';
import * as Screen from './screen';
import {Scene, Router, Actions} from 'react-native-router-flux';

const scenes = Actions.create(
    <Scene key="Modal" component={Modal} >
        <Scene key="Root" hideNavBar={true}>
            <Scene key="Home" component={Screen.Home} title="首页" initial={true} />
            <Scene key="SignIn" component={Screen.SignIn} title="登录"/>
            <Scene key="SignUp" component={Screen.SignUp} title="注册"/>
        </Scene>
    </Scene>
);

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { splashed: false };
    }

    componentDidMount() {
        this.timer = setTimeout(() => { this.setState({ splashed: true }); }, 2000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        if (!this.state.splashed) {
            return Screen.SplashScreen;
        }
        else {
            return (<Router scenes={scenes} sceneStyle={{ backgroundColor: '#F7F7F7' }}/>);
        }
    }
}