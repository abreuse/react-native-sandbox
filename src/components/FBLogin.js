import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import Button from '../components/Button';

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

  const loginThroughFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login Cancelled');
        } else {
          console.log('logged in !! :' + JSON.stringify(result));
        }
      },
      function (error) {
        console.log('some error occurred!!');
      },
    );
  };

  //TODO: USE LOGIN MANAGER  import {LoginManager} from 'react-native-fbsdk';
  return (
    <Button mode="contained" onPress={loginThroughFacebook}>
      Login with Facebook
    </Button>
  );
};

export default FBLogin;
