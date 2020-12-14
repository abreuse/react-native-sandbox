import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import GoogleLogin from '../components/GoogleLogin';
import FBLogin from '../components/FBLogin';

const HomeScreen = ({navigation}) => (
  <Background>
    <Logo />
    <Header>Login Template</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <GoogleLogin
      style={styles.socialNetworkButton}
      onLogin={() => navigation.navigate('Dashboard')}
    />
    <FBLogin
      onLogin={() => navigation.navigate('Dashboard')}
      style={styles.socialNetworkButton}
    />
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}>
      Sign Up
    </Button>
  </Background>
);

const styles = StyleSheet.create({
  socialNetworkButton: {
    width: '100%',
    marginVertical: 10,
  },
});

export default memo(HomeScreen);
