import React from 'react';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import Button from '../components/Button';

class FBLogin extends React.Component {
  onLogin;
  state = {userInfo: {}, loggedIn: false};

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (await this.isLoggedIn()) {
      const userData = await AccessToken.getCurrentAccessToken();
      await this.retrieveUserInfos(userData.accessToken);
      this.props.onLogin();
    }
  }

  isLoggedIn = async () => {
    const data = await AccessToken.getCurrentAccessToken();
    return data != null;
  };

  retrieveUserInfos = async (token) => {
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
          console.log('Could not retrieve Facebook user infos', error);
        } else {
          this.setState({userInfo: currentUserInfos});
          this.setState({loggedIn: true});
        }
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginThroughFacebook = async () => {
    const loginFlow = await LoginManager.logInWithPermissions([
      'public_profile',
    ]);
    if (!loginFlow.isCancelled) {
      const userData = await AccessToken.getCurrentAccessToken();
      const accessToken = userData.accessToken.toString();
      await this.retrieveUserInfos(accessToken);
      this.props.onLogin();
    }
  };

  render() {
    return (
      <Button mode="contained" onPress={this.loginThroughFacebook}>
        Login with Facebook
      </Button>
    );
  }
}

export default FBLogin;
