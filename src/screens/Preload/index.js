import React, {useEffect, useContext} from 'react';
import { Container,LoadingIcon } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';

import Prime from '../../assets/Prime.svg'
import Api from '../../api';

export default () => {

    const {dispatch: userdispatch} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() =>{
        //função para verificar/pegar token do aplicativo (caso alguém tenha feito login e etc)
            const checkToken = async() => {
                const token = await AsyncStorage.getItem('token');
                //validar token   
                if(token){
                     let res = await Api.checkToken(token);
                     //se token funcionou
                     if(res.token){
                         //3 passos
                        //1 salva token no async 
                        await AsyncStorage.setItem('token', res.token);
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
                        navigation.navigate('SignIn');
                     }
                    
                }//se não tem token, vai pra tela de login
                else{
                    navigation.navigate('SignIn');
                }
            }
            checkToken();
    },[]);


//configurar tamanho do logo
//cor e tamanho do icone de carregamento
    return (
        <Container>
            <Prime width="100%"  height="160" />
            <LoadingIcon size= "large" color="#FFFFFF"/>
        </Container>
    );
}