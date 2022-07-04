import React from "react";
import CustomButton from "../CustomButton";

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn("Sign In Facebook");
    }

    const onSignInApple = () => {
        console.warn("Sign In Apple");
    }

    const onSignInGoogle = () => {
        console.warn("Sign In Google");
    }

    return (
        <>
            <CustomButton
                text="Sign In with Facebook"
                onPress={onSignInFacebook}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton
                text="Sign In with Google"
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
            <CustomButton
                text="Sign In with Apple"
                onPress={onSignInApple}
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
        </>
    )
}

export default SocialSignInButtons;