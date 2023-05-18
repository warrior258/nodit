import React, { useEffect, useState } from 'react'
import axios from '../api/Instance';

const GetCommunity = () => {
    const [communities, setCommunities] = useState([]);

    const getCommunites = async () => {

        try {
            const response = await axios.get("communities");
            setCommunities(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCommunites();
    }, [])

  return (
    <div>
        {communities.length > 0 ? communities.map((community) => (
            <div key={community._id} className="flex justify-between">
                <p>{community.name}</p>
                <p>{community.joinedUsers.length} members</p>
            </div>
        )) : (
            <p>No communities</p>
        )}
    </div>
  )
}

export default GetCommunity