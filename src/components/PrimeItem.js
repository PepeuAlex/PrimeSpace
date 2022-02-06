import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction:row;
`;

const Avatar = styled.Image`
    width: 88px;
    height:88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const PrimeName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const SeeProfileButton = styled.View`
    width:100px;
    height: 26px;
    border: 1px solid #00B5E2;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #6BA4B8;
`;


export default ({data}) => {

    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('PrimeBuilding', {
            id: data.id,
            avatar: data.avatar,
            name: data.name
        });

    }

    return(
        <Area onPress={handleClick} >
            <Avatar source={{uri: data.avatar}} />
            <InfoArea>
                <PrimeName>{data.name}</PrimeName>

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Localidade</SeeProfileButtonText>
                </SeeProfileButton>

            </InfoArea>
        </Area>
    );
}