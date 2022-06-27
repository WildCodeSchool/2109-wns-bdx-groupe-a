import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


const EditDashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Dashboard</Text>
      <Button
      title="Click"
      onPress={()=> alert('button clicked')}></Button>
      </View>
  )
}

export default EditDashboard;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})