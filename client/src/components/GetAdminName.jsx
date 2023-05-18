import React, { useState, useEffect } from 'react'
import axios from '../api/Instance';

const GetAdminName = ({adminID}) => {

    const [name, setName] = useState('');

    const getAdminName = async (adminID) => {
        try {
            const response = await axios.get(`auth/user/${adminID}`);
            setName(response.data.name);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAdminName(adminID);
    }, [])

  return (
    <div>a/{name}</div>
  )
}

export default GetAdminName