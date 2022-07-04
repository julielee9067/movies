import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import MovieListScreen from "../screens/MovieListScreen";
import ActorListScreen from "../screens/ActorListScreen";
import GenreListScreen from "../screens/GenreListScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: true}}/>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{headerShown: true}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: true}}/>
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="MovieList" component={MovieListScreen} options={{headerShown: true}}/>
        <Stack.Screen name="ActorList" component={ActorListScreen} options={{headerShown: true}}/>
        <Stack.Screen name="GenreList" component={GenreListScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;