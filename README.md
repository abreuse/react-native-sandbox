Logins
===

Facebook login
===


Google login
===

react-native code : check file `GoogleLogin.js`

install the lib

    yarn add @react-native-community/google-signin

## For IOS

### link the lib with pod

    cd ios/ && pod install

### Generate iOS OAuth ID  

go to 

    https://console.developers.google.com

select/create your project and generate iOS client ID. A web client ID should be generated auto.

### Write React-Native code

in order to configure the google signin module

```js
useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '560581018034-647b0kct073lighkt00ec5h72kg29csh.apps.googleusercontent.com',
      iosClientId:
        '560581018034-uat18rtfv0sejjdnvu9274qarprl03hk.apps.googleusercontent.com',
    });
  });
```

## For Android