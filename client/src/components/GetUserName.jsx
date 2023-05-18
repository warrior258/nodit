import React, { useState, useEffect } from 'react'
import axios from '../api/Instance';

const GetUserName = ({id, option, style}) => {
    // console.log(id);

    const [name, setName] = useState('');

    const getUserName = async (id) => {
        try {
            const response = await axios.get(`auth/user/${id}`);
            setName(response.data.name);
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserName(id);
    }, [])

    //Returning if we need name or image of the user
    if(option === "name"){
        return `u/${name}`;
    }else{
        return (
            <img src={`https://api.multiavatar.com/${name}.png?apikey=eMbwRINBp8a5jC`} alt="" className={style} />
        )
    }
}

export default GetUserName