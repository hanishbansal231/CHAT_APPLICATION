import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import Actions from './Actions';

interface Comment {
    comment: string;
    createdAt: string;
    likes: number;
    username: string;
    userAvatar: string;
}

const Comment: React.FC<Comment> = ({ comment, createdAt, likes, username, userAvatar }) => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar
                    src={userAvatar}
                    size={'sm'}
                />
                <Flex gap={1} w={'full'} flexDirection={'column'}>
                    <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            {username}
                        </Text>
                        <Flex gap={2} alignItems={'center'}>
                            <Text fontSize={'sm'} color={'gray.light'}>{createdAt}</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{comment}</Text>
                    <Flex gap={3}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>
                    <Text fontSize={'sm'} color={'gray.light'}>
                        {likes + (liked ? 1 : 0)} likes
                    </Text>
                </Flex>
            </Flex>

            <Divider />
        </>
    )
}

export default Comment