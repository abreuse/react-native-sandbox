import React from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import Button from '../components/Button';

class GoogleLogin extends React.Component {
  onLogin;
  state = {userInfo: {}, loggedIn: false};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '560581018034-647b0kct073lighkt00ec5h72kg29csh.apps.googleusercontent.com',
      iosClientId:
        '560581018034-uat18rtfv0sejjdnvu9274qarprl03hk.apps.googleusercontent.com',
    });

    GoogleSignin.isSignedIn().then((isSignedIn) => {
      isSignedIn &&
        GoogleSignin.signInSilently().then((currentUserInfo) => {
          this.setState({userInfo: currentUserInfo});
          this.setState({loggedIn: true});
          this.props.onLogin();
        });
    });
  }

  signIn = () => {
    GoogleSignin.hasPlayServices()
      .then(() => {
        GoogleSignin.signIn()
          .then((currentUserInfo) => {
            this.setState({userInfo: currentUserInfo});
            this.setState({loggedIn: true});
            this.props.onLogin();
          })
          .catch((err) => {
            console.log('Cannot log user with Google', err);
          });
      })
      .catch((err) => {
        console.log('Play Services is not installed on this phone', err);
      });
  };

  render() {
    return (
      <Button mode="contained" onPress={this.signIn}>
        Login with Google
      </Button>
    );
  }
}

export default GoogleLogin;
