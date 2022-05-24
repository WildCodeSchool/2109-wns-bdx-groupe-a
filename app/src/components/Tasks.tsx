import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function Tasks() {

  return (
    <View>
    <Card>
    <Card.Title
    title="Task 1"
    subtitle="You need to updtae the description and add somme pictures"
    left={(props) => <Avatar.Icon {...props} icon="folder"/>}
    right={(props) => <IconButton {...props} icon="more" onPress={() => {}} />}
  />
  </Card>
  <Card>
  <Card.Title
  title="Task 2"
  subtitle="You need to updtae the description and add somme pictures"
  left={(props) => <Avatar.Icon {...props} icon="folder"/>}
  right={(props) => <IconButton {...props} icon="more" onPress={() => {}} />}
/>
</Card>
</View>
  );
} 