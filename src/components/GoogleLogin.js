import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {View, TouchableOpacity, Text} from 'react-native';

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

  signOut = () => {
    GoogleSignin.revokeAccess()
      .then(() => {
        GoogleSignin.signOut()
          .then(() => {
            this.setState({loggedIn: false});
            this.setState({userInfo: {}});
          })
          .catch((err) => {
            console.log('Could not sign out from Google', err);
          });
      })
      .catch((err) => {
        console.log('Could not revoke access', err);
      });
  };

  render() {
    return (
      <View>
        {!this.state.loggedIn && (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
            disabled={false}
          />
        )}
        {this.state.loggedIn && (
          <View>
            <Text>Welcome {this.state.userInfo.user.name}</Text>
            <TouchableOpacity onPress={this.signOut}>
              <Text>SIGN OUT FROM GOOGLE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default GoogleLogin;
