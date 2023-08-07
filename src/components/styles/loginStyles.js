// homeStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerbuttons: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '90%',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 400,
    height: 200,
    alignItems: 'center',
    marginTop: 100,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 10,
  },
  roundedInputContainer: {
    borderRadius: 5,
  },
  button: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    },
});
