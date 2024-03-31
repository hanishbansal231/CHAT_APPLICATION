import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'

const PostPage: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar src='hello' size={"md"} name='Hanish Bansal' />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>Hanish Bansal</Text>
            <Image src='Hello' w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'} >
          <Text fontSize={'sm'} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let's Talk about Threads.</Text>
      <Box
        overflow={'hidden'}
        borderRadius={6}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src='Hello' w={'full'} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'} fontSize={'sm'}>238 resplies</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={"gray.light"} fontSize={'sm'}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignContent={'center'}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={'gray.light'}>Get the app to liked,reply and post.</Text>
        </Flex>
        <Button >
          Get
        </Button>
      </Flex>

      <Divider my={4} />

      <Comment comment={'Looks realy Good!'} createdAt="2d" likes={200} username={'Hanish'} userAvatar={'Hello'} />
    </>
  )
}

export default PostPage