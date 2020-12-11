import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {View, TouchableOpacity, Text} from 'react-native';

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '560581018034-647b0kct073lighkt00ec5h72kg29csh.apps.googleusercontent.com',
      iosClientId:
        '560581018034-uat18rtfv0sejjdnvu9274qarprl03hk.apps.googleusercontent.com',
    });

    GoogleSignin.isSignedIn().then((isSignedIn) => {
      isSignedIn &&
        GoogleSignin.signInSilently().then((currentUserInfo) => {
          setUserInfo(currentUserInfo);
          setLoggedIn(true);
        });
    });
  }, []); //[] as 2nd parameter will tell useEffect to execute only once

  const signIn = () => {
    GoogleSignin.hasPlayServices()
      .then(() => {
        GoogleSignin.signIn()
          .then((currentUserInfo) => {
            setUserInfo(currentUserInfo);
            setLoggedIn(true);
          })
          .catch((err) => {
            console.log('Cannot log user with Google', err);
          });
      })
      .catch((err) => {
        console.log('Play Services is not installed on this phone', err);
      });
  };

  const signOut = () => {
    GoogleSignin.revokeAccess()
      .then(() => {
        GoogleSignin.signOut()
          .then(() => {
            setLoggedIn(false);
            setUserInfo({});
          })
          .catch((err) => {
            console.log('Could not sign out from Google', err);
          });
      })
      .catch((err) => {
        console.log('Could not revoke access', err);
      });
  };

  return (
    <View>
      {!loggedIn && (
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={false}
        />
      )}
      {loggedIn && (
        <View>
          <Text>Welcome {userInfo.user.name}</Text>
          <TouchableOpacity onPress={signOut}>
            <Text>SIGN OUT FROM GOOGLE</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GoogleLogin;
