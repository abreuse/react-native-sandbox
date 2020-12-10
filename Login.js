import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const Login = ({appName}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    //TODO: SEND LOGIN REQUEST TO BACK END
  };

  const forgotPassword = () => {
    //TODO: SEND FORGOT PASSWORD REQUEST TO BACK END
  };

  const toSignupView = () => {
    //TODO: Redirect to signup form view
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.logo}>{appName}</Text>

        <View style={[styles.inputView, styles.usernameView]}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            returnKeyType="next"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={[styles.inputView, styles.passwordView]}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.forgotView} onPress={forgotPassword}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toSignupView}>
          <Text>
            New to {appName}?
            <Text style={styles.boldBlue}> Create an account!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3099d9',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f7f8dc',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    padding: 20,
  },
  usernameView: {
    marginBottom: 20,
  },
  passwordView: {
    marginBottom: 10,
  },
  inputText: {
    height: 50,
  },
  forgotView: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgot: {
    fontSize: 13,
    textDecorationLine: 'underline',
    alignItems: 'flex-end',
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#3099d9',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  boldBlue: {
    color: '#2380de',
    fontWeight: 'bold',
  },
});

export default Login;
