import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Row from '../Row'
import api from '../../utilities/api';
import styles from '../Style';
import data from '../../utilities/data';


export default class Candidates extends Component {

    constructor(props) {
        super(props);
        //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });        
        this.state = {
            IBMImages: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
        }
    }


    componentDidMount() {
        this.setState({                
            IBMImages: this.state.IBMImages.cloneWithRows(data[0].images)
        })
        // api.getCandidatesFromApiAsync(this.props.navigation.state.params.path).then((res) => {
        //     if (res.images.length>0) this.setState({                
        //         IBMImages: this.state.IBMImages.cloneWithRows(res.images)
        //     })
        // })
    }

    render() {
        // const dataSource = this.ds.cloneWithRows([{
        //     resolved_url: this.props.navigation.state.params.path,
        //     name: 'Obama'
        // }, {
        //     resolved_url: this.props.navigation.state.params.path,
        //     name: 'Obama'
        // }, {
        //     resolved_url: 'https://www.whitehouse.gov/wp-content/uploads/2017/12/44_barack_obama1.jpg',
        //     name: 'Obama'
        // }]);
        if (this.state.IBMImages.getRowCount() === 0) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        else {
            return (
                <ListView contentContainerStyle={styles.list}
                    dataSource={this.state.IBMImages}
                    renderRow={(data) => {
                        if (data && data.faces[0] && data.faces[0].identity) 
                        return (
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 20 }}>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Options_screen', { name: data.faces[0].identity.name}) }}>
                                    <Image style={styles.imageViewContainer} source={{ uri: data.resolved_url }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.textViewContainer} onPress={() => {this.props.navigation.navigate('Options_screen', { name: data.faces[0].identity.name }) }}>
                                    <View style={styles.textViewBox}>
                                        <Text style={styles.text}>
                                            {data.faces[0].identity.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                        else
                        return(
                            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 20 }}>
                                <TouchableOpacity>
                                    <Image style={styles.imageViewContainer} source={{ uri: this.props.navigation.state.params.path }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.textViewContainer}>
                                    <View style={styles.textViewBox}>
                                        <Text>
                                            Can not guess who is, please try a gain!
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            );
        }
    }
}