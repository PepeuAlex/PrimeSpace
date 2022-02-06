import React from "react";
import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native";

import api from "../../api";

export default () => {
    
    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await api.logout();
        navigation.reset({
            routes:[{name:'SignIn'}]
        });
    }

    return(
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick} />
        </Container>
    );
}