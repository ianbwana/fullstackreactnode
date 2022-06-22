import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text
} from 'react-native';
const Loader = props => {
  const {
    loading,
    content,
    ...attributes
  } = props;
return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={{backgroundColor: "#ffffff", shadowColor: '#000000', borderRadius: 2,

             shadowOffset: {
               width: 0,
               height: 3
             },
             shadowRadius: 5,
             shadowOpacity: 1.0, padding:20}}>
             <View style={{flexDirection:"row",flex:1, alignItems:"center", width:200}}>

               <View style={{flex:1}}>
                <ActivityIndicator
                  animating={loading} size="large" color="#0000ff"/>
               </View>
               <View style={{flex:3,paddingLeft:20}}>
                 <Text style={{fontFamily:"Raleway-SemiBold"}}>{content}</Text>
               </View>
             </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000060'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#00000000',
    height: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;