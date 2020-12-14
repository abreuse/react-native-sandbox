import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const FBLogin = ({onLogin}) => {
  const [userInfo, setUserInfo] = useState({});

  const retrieveUserInfos = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, currentUserInfos) => {
        if (error) {
          console.log('Could not retrieve FB user infos', error);
        } else {
          setUserInfo(currentUserInfos);
        }
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  //TODO: USE LOGIN MANAGER  import {LoginManager} from 'react-native-fbsdk';
  return (
    <View>
      <LoginButton
        style={{width: 305, height: 48}}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('Could not log user through FB', result.error);
          } else if (result.isCancelled) {
            console.log('User cancels the login through FB');
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              const accessToken = data.accessToken.toString();
              retrieveUserInfos(accessToken);
              onLogin();
            });
          }
        }}
        onLogoutFinished={() => setUserInfo({})}
      />
      {userInfo.name && <Text>Logged in As {userInfo.name}</Text>}
    </View>
  );
};

export default FBLogin;
