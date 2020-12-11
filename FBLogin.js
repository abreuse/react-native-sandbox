import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const FBLogin = () => {
  const [userInfo, setUserInfo] = useState({});

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(result);
          console.log('result:', result);
        }
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  return (
    <View style={{flex: 1, margin: 50}}>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              const accessToken = data.accessToken.toString();
              getInfoFromToken(accessToken);
            });
          }
        }}
        onLogoutFinished={() => setUserInfo(userInfo)}
      />
      {userInfo.name && (
        <Text style={{fontSize: 16, marginVertical: 16}}>
          Logged in As {userInfo.name}
        </Text>
      )}
    </View>
  );
};

export default FBLogin;
