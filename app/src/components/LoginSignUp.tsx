import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import {useState, useCallback, SetStateAction} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#6200EE',
    },
    block: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    blockTitle: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    title: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 35,
        color: 'white',
    },
    titleText: {
        fontSize: 25,
        color: "white",
    },
    text: {
        color: "white",
    },
    input: {
        height: 50,
        maxHeight: 50,
        minWidth: '70%',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#6200EE'
    },
    button: {
        marginVertical: 40,
    },
    buttonContent: {
        backgroundColor: 'white'
    },
})

export const SIGN_UP = gql`
mutation Mutation(
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
) {
  signUp(
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
  ) {
    id
    firstName
    lastName
    email
  }
}
`;

export default function Login () {
    const navigation = useNavigation();
    const [signUp, {}] = useMutation(SIGN_UP);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    /* const handleClick = useCallback(async () => {
        const onLoginSuccess = await ApiUtils.signIn(firstName, lastName, email, password);
        if (onLoginSuccess) {
            setError(false);
            navigation.navigate('App');

        } else {
            setError(true);
        }
    }, [error, firstName, lastName, email, password]); */

    return (
        <View style={styles.container}>

            <View style={styles.block}>
                <View style={styles.blockTitle}>
                    <Text style={[styles.title]}>Trello</Text>
                </View>
                <Text style={styles.titleText}>"Plan everything"</Text>
            </View>

            <View style={[styles.block]}>
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: '#6200EE'}}}
                    underlineColor='transparent'
                    placeholderTextColor='black'
                    activeUnderlineColor='black'
                    selectionColor='black'
                    label="FirstName"
                    value={firstName}
                    autoComplete={true}
                    onChangeText={(text: SetStateAction<string>) => setFirstName(text)}
                    />
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: '#6200EE'}}}
                    underlineColor='transparent'
                    placeholderTextColor='black'
                    activeUnderlineColor='black'
                    selectionColor='black'
                    label="LastName"
                    value={lastName}
                    autoComplete={true}
                    onChangeText={(text: SetStateAction<string>) => setLastname(text)}
                    />    
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: '#6200EE'}}}
                    underlineColor='transparent'
                    placeholderTextColor='black'
                    activeUnderlineColor='black'
                    selectionColor='black'
                    label="Email"
                    value={email}
                    autoComplete={true}
                    onChangeText={(text: SetStateAction<string>) => setEmail(text)}
                    />
                <TextInput
                    style={[styles.input]}
                    theme={{colors: {placeholder: '#6200EE'}}}
                    underlineColor='transparent'
                    placeholderTextColor='black'
                    activeUnderlineColor='black'
                    selectionColor='black'
                    label="Password"
                    value={password}
                    autoComplete={true}
                    onChangeText={(text: SetStateAction<string>) => setPassword(text)}
                />
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    color='#6200EE'
                    onPress={() => navigation.navigate('LoginSignIn' as never)}
                    /* onPress={() => {
                          signUp({ variables: { firstName:"toto", lastName:"bla", email:"test@test.com", password:"Abcdefgh" } });
                      }} */
                >
                    Sign Up
                </Button>
            </View>

        </View>
    )
}