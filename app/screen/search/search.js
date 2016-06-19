import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,    
    TouchableOpacity,
} from 'react-native';
import Util from '../util';
import Config, {ApiConfig} from '../config';
import {ApiClient, LocalStorage} from './common';

const suggestBaseUri = Config.SuggestBaseUri;

export class SearchScreen extends Component {

    constructor(props) {
        super(props);

        this.requests = [];
        this.minLength = 1;
        this.timeout = 5 * 1000;

        let dataSource = new ListView.DataSource({ rowHasChanged: function rowHasChanged(a, b) { return a !== b; } });
        this.state = {
            listViewDisplayed: false,
            dataSource: dataSource,
            input: props.input,
            history: [],
            hot: [],
        }
    }

    componentDidMount() {


    }

    componentWillUnmount() {
        this.abortRequests();
    }

    abortRequests() {
        for (let i = 0; i < this.requests.length; i++) {
            this.requests[i].abort();
        }
        this.requests = [];
    }

    onTimeout() {

    }

    request(text) {
        this.abortRequests();
        if (text.length >= this.minLength) {
            const request = new XMLHttpRequest();
            this.requests.push(request);
            request.timeout = this.timeout;
            request.ontimeout = this.onTimeout;
            request.onreadystatechange = () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    const results = JSON.parse(request.responseText);
                    if (typeof responseJSON.predictions !== 'undefined') {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(this.buildRowsFromResults(results)),
                        });
                    }
                }
                request.open('GET', suggestBaseUri + '?input=' + encodeURI(text));
                request.send();
            };
        } else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([]),
            });
        }
    }

    buildRowsFromResults(results) {
        return results;
    }

    triggerFocus() {
        this.textInput.focus();
    }

    triggerBlur() {
        this.textInput.blur();
    }

    onChangeText(text) {
        this.request(text);
        this.setState({
            input: text,
            listViewDisplayed: true,
        });
    }

    onBlur() {
        this.triggerBlur();
        this.setState({ listViewDisplayed: false });
    }

    onFocus() {
        this.setState({ listViewDisplayed: true });
    }

    onPress(rowData) {
        this.abortRequests();
    }

    renderHistory() {
        if (this.state.history && this.state.history.length > 0) {
            return (
                <View>
                    <Text>最近搜索</Text>
                </View>
            );
        }
        return null;
    }

    renderHot() {
        if (this.state.hot && this.state.hot.length > 0) {
            return (
                <View>
                    <Text>热门搜索</Text>
                </View>
            );
        }
        return null;
    }

    loadHistory() {
        LocalStorage.load({
            key: 'SearchHistory',
            autoSync: false,
        }).then(result => {
            this.setState({ history: result });
        }).catch(err => {
            console.error(err);
        }).done();
    }

    loadHot() {
        LocalStorage.load({
            key: 'SearchHot',
            autoSync: true,
            syncInBackground: true
        }).then(result => {
            console.log(result);
            this.setState({ hot: result });
        }).catch(err => {
            console.error(err);
        }).done();
    }

    renderRow(rowData = {}) {
        return (
            <TouchableHighlight
                onPress={() => this.onPress(rowData) }
                underlayColor="#c8c7cc"
                >
                <View>
                    <View style={[defaultStyles.row]}>
                        <Text
                            style={[{ flex: 1 }, defaultStyles.description]}
                            numberOfLines={1}
                            >
                            {rowData.Name}
                        </Text>
                    </View>
                    <View style={[defaultStyles.separator]} />
                </View>
            </TouchableHighlight>
        );
    }

    renderListView() {
        if (this.state.text !== '' && this.state.listViewDisplayed === true) {
            return (
                <ListView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode="on-drag"
                    style={[defaultStyles.listView]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    automaticallyAdjustContentInsets={false}
                    />
            );
        } else {
            return (
                <View>
                    {this.renderHistory() }
                    {this.renderHot() }
                </View>
            );
        }
    }

    render() {
        return (
            <View style={[defaultStyles.container]}>
                <View style={[defaultStyles.textInputContainer, this.props.styles.textInputContainer]}>
                    <TextInput
                        ref={ref => this.textInput = ref}
                        autoFocus={this.autoFocus}
                        style={[defaultStyles.textInput]}
                        onChangeText={this.onChangeText}
                        value={this.state.input}
                        placeholder={this.props.placeholder}
                        onFocus={this.onFocus}
                        clearButtonMode="while-editing"
                        />
                </View>
                {this.renderListView() }
            </View>
        );
    }

}

const defaultStyles = {
    container: {
        flex: 1,
    },
    textInputContainer: {
        backgroundColor: '#C9C9CE',
        height: 44,
        borderTopColor: '#7e7e7e',
        borderBottomColor: '#b5b5b5',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 28,
        borderRadius: 5,
        paddingTop: 4.5,
        paddingBottom: 4.5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 7.5,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
    },
    poweredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    powered: {
        marginTop: 15,
    },
    listView: {
        // flex: 1,
    },
    row: {
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: 1,
        backgroundColor: '#c8c7cc',
    },
    description: {
    },
};