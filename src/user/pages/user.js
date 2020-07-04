import React from 'react'; 

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: 'Chapter 4', 
            image: 'https://www.deccanherald.com/sites/dh/files/article_images/2013/06/25/340882.gif', 
            places: 9
        },
        {
            id: 'u2', 
            name: 'Chapter 4', 
            image: 'https://image.freepik.com/free-vector/triangular-dark-polygonal-background_23-2148261453.jpg', 
            places: 9
        }
        ]
return <UsersList items={USERS} />;
};

export default Users;