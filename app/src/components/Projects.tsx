import React from 'react';
import { StyleSheet } from 'react-native';
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Project } from "../schemaTypes";
import { Card, Button, Title } from 'react-native-paper';

export default function Projects() {

  //const { loading, error, data }= useQuery<Project>(GET_PROJECTS);

  const styles = StyleSheet.create({
    title: {
      marginLeft: 15,
      marginRight: 150,
    }
  });

  return (
    <Card>
      <Card.Cover source={{ uri: 'https://picsum.photos/800' }} />
    <Card.Actions>
    <Title style={[styles.title]} >Project 1</Title>
      <Button>See details</Button>
    </Card.Actions>
    <Card.Cover source={{ uri: 'https://picsum.photos/600' }} />
    <Card.Actions>
    <Title style={[styles.title]} >Project 2</Title>
      <Button>See details</Button>
    </Card.Actions>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
    <Title style={[styles.title]} >Project 3</Title>
      <Button>See details</Button>
    </Card.Actions>
  </Card>
  );
} 