import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import {useNavigation} from "@react-navigation/native";
import {useForm} from "react-hook-form";
import axios from "axios";

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const signUpUrl = 'http://localhost:5000/add-user'

  const onRegisterPressed = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(signUpUrl, data);
      if (response.status === 200) {
        alert(`A user with username ${data.username} has been created`);
      } else {
        throw new Error('An error has occurred')
      }
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
    navigation.navigate('SignIn');
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  }

  const onPrivacyPressed = () => {
    console.warn("Privacy");
  }

  const onTermsOfUsePressed = () => {
    console.warn("Terms of Use");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          name='username'
          control={control}
          placeholder='Username'
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long'
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long'
            },
          }}
        />
        <CustomInput
          name='password'
          control={control}
          placeholder='Password'
          secureTextEntry={true}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long'
            },
            maxLength: {
              value: 24,
              message: 'Password should be max 24 characters long'
            },
          }}
        />
        <CustomInput
          name='confirmPassword'
          control={control}
          placeholder='Confirm Password'
          secureTextEntry={true}
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />
        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)}/>
        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text>
          {' '}and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
        </Text>
        <SocialSignInButtons/>
        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'grey',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075'
  },
})

export default SignUpScreen;
