import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {View, TouchableOpacity, Text} from 'react-native';

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '560581018034-647b0kct073lighkt00ec5h72kg29csh.apps.googleusercontent.com',
      iosClientId:
        '560581018034-uat18rtfv0sejjdnvu9274qarprl03hk.apps.googleusercontent.com',
    });
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const currentUserInfo = await GoogleSignin.signIn();
      setUserInfo(currentUserInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={false}
      />
      <TouchableOpacity onPress={signOut}>
        <Text>SIGN OUT FROM GOOGLE</Text>
      </TouchableOpacity>
      <Text>user info : {JSON.stringify(userInfo)}</Text>
    </View>
  );
};

export default GoogleLogin;
