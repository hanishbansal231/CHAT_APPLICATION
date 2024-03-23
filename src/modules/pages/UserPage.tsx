import React from 'react';
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage: React.FC = () => {
    return (
        <>
            <UserHeader />
            <UserPost likes={1200} replies={481} postImg="Hello" postTitle='Hello' />
        </>
    )
}

export default UserPage