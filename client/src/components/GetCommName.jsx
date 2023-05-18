import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/Instance';
const GetCommName = ({id}) => {

    const [name, setName] = useState('');

    const getCommunityName = async (id) => {
        try {
            const response = await axios.get(`communities/${id}`);
            setName(response.data.name);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCommunityName(id);
    }, [])

  return (
    <Link to={`/communities/community/${id}`}>@{name}</Link>
  )
}

export default GetCommName