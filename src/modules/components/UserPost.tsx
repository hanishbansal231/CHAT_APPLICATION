import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from '../components/Actions'

interface UserPostProps {
    likes: number;
    replies: number;
    postImg: string;
    postTitle: string;
}

const UserPost: React.FC<UserPostProps> = ({ likes, replies, postImg, postTitle }) => {

    const [liked, setLiked] = useState(false);
    return (
        <Link to={'/name/post/1'}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar 
                    size={"md"} 
                    name='Hanish Bansal' 
                    src='Hello'
                    ></Avatar>
                    <Box w={'1px'} h={"full"} bg='gray.light' my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar
                            size={"xs"}
                            name='hanish'
                            src='Hello'
                            position={'absolute'}
                            top={0}
                            left={"15px"}
                            padding={"2px"}
                        />
                        <Avatar
                            size={"xs"}
                            name='hanish'
                            src='Hello'
                            position={'absolute'}
                            bottom={0}
                            right={"-5px"}
                            padding={"2px"}
                        />
                        <Avatar
                            size={"xs"}
                            name='hanish'
                            src='Hello'
                            position={'absolute'}
                            bottom={0}
                            left={"4px"}
                            padding={"2px"}
                        />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontWeight={"bold"} fontSize={"sm"}>Hanish Bansal</Text>
                            <Image src={'Hello'} w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={'center'}>
                            <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{postTitle}</Text>
                    <Box
                        overflow={'hidden'}
                        borderRadius={6}
                        border={"1px solid"}
                        borderColor={"gray.light"}
                    >
                        <Image src={postImg} w={'full'} />
                    </Box>
                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>

                    <Flex gap={2} alignItems={'center'}>
                        <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>{likes} like</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
}

export default UserPost