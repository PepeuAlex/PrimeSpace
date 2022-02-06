import React, {useState, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Swiper from "react-native-swiper";

import PrimeModal from '../../components/PrimeModal'

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg'
import BackIcon from '../../assets/back.svg'

import { 
    Container,
    Scroller,
    PageBody,
    BackButton,
    LoadingIcon,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,

    ServiceArea,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServiceDescription,
    ServiceChooseButton,
    ServiceChooseBtnText,

    TestimonialArea
} from "./styles";


import api from "../../api";

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService ] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        const getPrimeInfo = async () =>{
            setLoading(true);

            let json= await api.getPrime(userInfo.id);
            if(json.error ==''){
                setUserInfo(json.data);
                setFavorited(json.data.favorited);

                console.log(json.data);
            }else{
                alert("Erro: " + json.error);
            }
            setLoading(false);
        }
        
        getPrimeInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick =() =>{
        //muda o valor de true pra false/false pra true de fav, ai o icone muda
        setFavorited ( !favorited);
        api.setFavorite(userInfo.id);
    }

    const handleServiceChoose =(key) =>{
        setSelectedService(key);
        setShowModal(true);
    }
    //swiper é pra mostrar as fotos
    //fakeswiper é pra fazer a boa caso n tenha publicado ainda
    return(
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper 
                        style ={{height: 240}} 
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item,key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}} />
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick} >
                            {favorited ?
                                <FavoriteFullIcon width="24" height="24" fill="#CE0037" />
                                :
                                <FavoriteIcon width="24" height="24" fill="#CE0037" />
                        }
                        </UserFavButton>
                    </UserInfoArea>

                        {loading &&
                            <LoadingIcon size= "large" color="#000000" />
                        }

                    {userInfo.services &&
                        <ServiceArea>
                            <ServicesTitle>O que deseja agendar?</ServicesTitle>

                            {userInfo.services.map((item,key)=>(
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name} </ServiceName>
                                        <ServiceDescription>R$ {item.price}</ServiceDescription>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={()=>handleServiceChoose()} >
                                        <ServiceChooseBtnText> Agendar </ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}

                        </ServiceArea>
                    }
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton} >
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>

            <PrimeModal 
                show={showModal}
                setShow = {setShowModal}
                user = {userInfo}
                service = {selectedService}
            />

        </Container>
    );
}