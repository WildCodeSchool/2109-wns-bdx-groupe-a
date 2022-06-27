import { gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import App from '../../App';
import ApiUtils from '../utils/ApiUtils';

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
        marginVertical: 20,
        width: '40%',
    },
    buttonContent: {
        backgroundColor: 'white'
    },
})

export default function Login () {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleClick = useCallback(async () => {
        const onLoginSuccess = await ApiUtils.signIn(email, password);
        if (onLoginSuccess) {
            setError(false);
            navigation.navigate('Projects');

        } else {
            setError(true);
        }
    }, [error, email, password, navigation]);

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
                    label="Email"
                    value={email}
                    autoComplete="true"
                    onChangeText={text => setEmail(text)}
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
                    autoComplete="true"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <HelperText type="error" visible={error} onPressIn={()=>{}} onPressOut={()=>{}}>
                    Could not sign in with provided email address or password
                </HelperText>
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    color='#6200EE'
                    onPress={handleClick}
                    /* onPress={() => {
                          signUp({ variables: { firstName:"toto", lastName:"bla", email:"test@test.com", password:"Abcdefgh" } });
                      }} */
                >
                    Sign In
                </Button>
                <Button
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    color='#6200EE'
                    onPress={() => navigation.navigate('LoginSignUp' as never)}
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