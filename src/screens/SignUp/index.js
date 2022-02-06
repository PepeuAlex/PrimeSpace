import React, {useState,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';
import { 
        Container,
        InputArea,
        CustomButton,
        CustomButtonText,
        SignMessageButton,
        SignMessageButtonText,
        SignMessageButtonTextBold

} from './styles';

import SignInput from '../../components/SignInput';

import Api from '../../api';

import PrimeLogo from '../../assets/Prime.svg';
import EmailIcon from  '../../assets/email.svg';
import LockIcon from  '../../assets/lock.svg';
import PersonIcon from  '../../assets/person.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default () => {
    const navigation = useNavigation();
    
    const {dispatch: userdispatch} = useContext(UserContext);

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != ''){
            let res = await Api.signUp(nameField, emailField,passwordField);
            console.log(res);
            
            if(res.token){
                //3 passos
                //1 salva token no async 
                await AsyncStorage.setItem('token', json.token);
                //dps salva no context
                userdispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                });
                //manda user para login
                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
            }else{
                alert("Erro:"+ res.error);
            }
        } else{
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick =() =>{
        navigation.reset({
            routes: [{ name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <PrimeLogo width="100%" height="160"/>

            <InputArea>

                <SignInput 
                    IconSvg={PersonIcon}
                    placeholder = "Digite seu nome"
                    value = {nameField}
                    onChangeText={t=>setNameField(t)}
                
                />

                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder = "Digite seu e-mail"
                    value = {emailField}
                    onChangeText={t=>setEmailField(t)}
                
                />
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder = "Digite sua senha"
                    value = {passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>

            </SignMessageButton>
        </Container>
    );
}