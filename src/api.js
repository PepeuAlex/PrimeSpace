import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';


export default {
    checkToken:async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({token})

        });
        const json = await req.json();
        return json;

    },
    signIn: async (email,password) => {
        const req = await fetch(`${BASE_API}/auth/login`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email,password})
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    
        });
        const json = await req.json();
        return json;
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({token})
    
        });
        const json = await req.json();
        return json;
    },
    //lista de primetals
    getPrimetals: async (lat =null, lng=null, address=null ) => {
        const token = await AsyncStorage.getItem('token');
/*
        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);
*/
        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    //detalhes de 1 primetals
    getPrime: async(id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        console.log(json);
        return json;
    },
    setFavorite: async (barberId) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorite`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({barber:barberId})
    
        });
        const json = await req.json();
        return json;
    },
    setAppointment: async (userId,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/barber/${userId}/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                service,
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                hour: selectedHour
            })
        });
        const json = await req.json();        
        return json;
    },
    search: async (barberName) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/search?q=${barberName}&token=${token}`);
        const json = await req.json();
        return json;
    },
    getFavorites: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/favorites?token=${token}`);
        const json = await req.json();
        return json;
    },
    getAppointments: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/appointments?token=${token}`);
        const json = await req.json();
        return json;
    },
    updateUser: async (body) => {
        const token = await AsyncStorage.getItem('token');
        body.token = token;

        const req = await fetch(`${BASE_API}/user`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await req.json();        
        return json;
    },

};