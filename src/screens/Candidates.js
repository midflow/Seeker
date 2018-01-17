import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import Row from '../Row'
import api from '../../utilities/api';
import styles from '../Style';
import data from '../../utilities/data';
import ImageResizer from 'react-native-image-resizer';

export default class Candidates extends Component {

    constructor(props) {
        super(props);
        //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });        
        this.state = {
            IBMImages: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),  
            identity:null,
            isLoading:false,  
            noFaces:true,        
        }
    }


    componentDidMount() {
        // if (this.props.navigation.state.params.cameraroll=='true')
        // {
        //     this.setState({
        //         imageSource:this.props.navigation.state.params.path
        //     });
        // }
        // else
        // {
            this.setState({
                imageSource:this.props.navigation.state.params.path
            });
        //}
        
        
        // this.setState({                
        //             IBMImages: this.state.IBMImages.cloneWithRows(data[0].images),
        //             imageSource:data[0].images[0].resolved_url
        //             //IBMImages: this.state.IBMImages.cloneWithRows(data)
        //         })
        
        ImageResizer.createResizedImage(this.props.navigation.state.params.path, 320, 320, 'JPEG', 100).then((response) => {
            this.setState({ isLoading: true });
            api.getCandidatesFromApiAsync_Fetch(response.uri).then((res) => {

                if (res.images.length > 0) {
                    res.images[0].faces.forEach(e => {
                        if (e.identity)
                        this.setState({
                            noFaces:false,
                        });
                    });

                    this.setState({
                        IBMImages: this.state.IBMImages.cloneWithRows(res.images[0].faces),
                        isLoading: false,
                        identity: res.images[0].faces.length > 0 && res.images[0].faces[0].identity ? res.images[0].faces[0].identity : null,
                        //IBMImages: this.state.IBMImages.cloneWithRows(data)
                    });
                }
            })
        }).catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
            console.log(err);
        });
        // api.getCandidatesFromApiAsync_Fetch(this.props.navigation.state.params.path).then((res) => {
        //     if (res.images.length>0) this.setState({                
        //         IBMImages: this.state.IBMImages.cloneWithRows(res.images)
        //         //IBMImages: this.state.IBMImages.cloneWithRows(data)
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
        if (this.state.isLoading && this.state.IBMImages.getRowCount() === 0) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        else if (this.state.noFaces || this.state.IBMImages.getRowCount() === 0 || (this.state.IBMImages.getRowCount()==1 
        && this.state.identity==null))    
        {
            return <View style={{ flex: 0.5, flexDirection: "column"}}>
                            <View style={{ flex: 1, alignItems: "center", paddingBottom:20 }}>
                              <Image style={styles.imageViewTitle} source={{ uri: this.props.navigation.state.params.path }} />
                              </View>
                              <TouchableOpacity style={styles.textViewContainer} onPress={() => {
                                  this.props.navigation.navigate(
                                    "Home_screen"
                                  );
                                }}>
                                <View style={{flex: 0.7, borderRadius: 10, backgroundColor: "#47525e", justifyContent: "center"}}>
                                  <Text
                                    style={{
                                      fontSize: 25, margin:10, color:'#fff'
                                    }}
                                  >
                                    We could not catch
                                    it, Please try it
                                    again!
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            
                          </View>;
            }    
        else {
            return (
                <ScrollView style={{flex: 1}}><ListView contentContainerStyle={styles.list}
                    dataSource={this.state.IBMImages}                    
                    renderRow={(data) => {
                        if (data && data.identity) 
                        return (
                            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Options_screen', { name: data.identity.name}) }}>
                                    <Image style={styles.imageViewContainer} source={{ uri: this.state.imageSource }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.textViewContainer} onPress={() => {this.props.navigation.navigate('Options_screen', { name: data.identity.name, imageSource: this.state.imageSource }) }}>
                                    <View style={styles.textViewBox}>
                                        <Text style={styles.text}>
                                            {data.identity.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                        else
                        return <View/>;
                        // return <View style={{ flex: 0.5, flexDirection: "row"}}>
                        //     <View style={{ flex: 1, alignItems: "center", paddingBottom:20 }}>
                        //       <Image style={styles.imageViewTitle} source={{ uri: this.props.navigation.state.params.path }} />
                        //       </View>
                        //       <TouchableOpacity style={styles.textViewContainer} onPress={() => {
                        //           this.props.navigation.navigate(
                        //             "Home_screen"
                        //           );
                        //         }}>
                        //         <View style={{flex: 0.7, borderRadius: 10, backgroundColor: "#47525e", justifyContent: "center"}}>
                        //           <Text
                        //             style={{
                        //               fontSize: 25, margin:10
                        //             }}
                        //           >
                        //             We could not catch
                        //             it, Please try it
                        //             again!
                        //           </Text>
                        //         </View>
                        //       </TouchableOpacity>
                            
                        //   </View>;
                    }}
                />
                </ScrollView>
            );
        }
    }
}