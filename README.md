Logins
===

Facebook login
===

react-native code : check file `FBLogin.js`

## For IOS

check this doc https://medium.com/@mehrankhandev/integrating-fbsdk-facebook-login-in-react-native-7b7600ce74a7

## For Android

check this doc https://medium.com/@mehrankhandev/integrating-fbsdk-facebook-login-in-react-native-7b7600ce74a7

for hash key : 

    keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64

## Known errors

check issues tab on this github

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

### Generate Android Client ID

go to 

    https://console.developers.google.com

select/create your project and generate iOS client ID. A web client ID should be generated auto.

For the SHA-1, use

    cd android 
    ./gradlew signingReport

and select SHA-1 from `variant: debug`

```
Variant: debug
Config: debug
Store: /Users/Alexis/Documents/Projets/ReactNative/GenericLogin/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: mercredi 1 mai 2052
```

you can also use :

    keytool -list -v -alias androiddebugkey -keystore ~.android/debug.keystore

### Update strings.xml

modify `android/app/src/main/res/values/strings.xml`

to

```xml
<resources>
    ...
    <string name="server_client_id">560581018034-647b0kct073lighkt00ec5h72kg29csh.apps.googleusercontent.com</string> 
    <!-- THIS IS YOUR WEB CLIENT ID FROM DEVELOPER CONSOLE -->
    ...
</resources>

```

### Others

check commit https://github.com/abreuse/react-native-sandbox/commit/11f998e9547e009fe93a8232e94ba6814c4628a6