//Login.tsx

import { View } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input , Image ,Button} from 'react-native-elements';
import styles from '../../src/components/styles/loginStyles.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.postimg.cc/L8BYGRGr/Whats-App-Image-2023-07-28-at-21-28-19-1.jpg' }}
        style={styles.image}
      />
      <Input
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.roundedInputContainer}
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.roundedInputContainer}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.containerbuttons}>
      <Button style={styles.button} title='Login' onPress={login} />
      {/* <Button style={styles.button} title='Register' onPress={register} /> */}
      </View>
    </View>
  );
}


export default Login;
