import React, { Component } from 'react';
import { View, Text, ListView, Image, FlatList, TouchableOpacity } from 'react-native';
import Row from '../Row'
import api from '../../utilities/api';
import styles from '../Style';


export default class Candidates extends Component {

    constructor(props) {
        super(props);
        //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });        
        this.state = { 
            IBMImages:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }        
    }

    
    componentDidMount() {
        api.getMoviesFromApiAsync().then((res) => {
            this.setState({
                IBMImages: this.state.IBMImages.cloneWithRows(res.images)
            })
        })                  
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
              <View style={styles.container}>
                <Text>
                  loading....
                </Text>
              </View>
            );
          }
          else {
        return (            
            <ListView contentContainerStyle={styles.list}                
                dataSource={this.state.IBMImages}
                renderRow={(data) => {
                    return (
                        <View style={{flex:1, flexDirection: 'row', paddingBottom:20}}>                        
                            <Image style={styles.imageViewContainer} source={{ uri: data.resolved_url }} />
                            <TouchableOpacity style={styles.textViewContainer} >
                            <View style={styles.textViewBox}>
                            <Text style={styles.text}>
                                {data.faces[0].identity.name}
                            </Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        );}
    }
}