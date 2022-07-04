import React from 'react';
import {Image, ScrollView, StyleSheet, useWindowDimensions, View,} from 'react-native';
import Logo from '../../../assets/Logo.png';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import axios from "axios";

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const userUrl = 'http://localhost:5000/'
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async (data) => {
    console.log(data);
    try {
      const response = await axios.get(`${userUrl}${data.username}/${data.password}/`);
      console.log(response.data)
      if (response.status === 200 && response.data.length === 1) {
        navigation.navigate('Home');
      } else {
        throw new Error('Invalid username or password')
      }
    } catch (error) {
      alert(`An error has occurred: ${error}`);
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)}/>
        <CustomButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <SocialSignInButtons/>
        <CustomButton
          text="Create an Account"
          onPress={onSignUpPressed}
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
    backgroundColor: 'white',
  },
  logo: {
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
