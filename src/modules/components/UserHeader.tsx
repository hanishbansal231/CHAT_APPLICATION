import { Avatar, Box, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import { translateConstant } from '../../shared/constants/translate.constant.ts';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const UserHeader: React.FC = () => {

    /**
     * Translate Function
     */
    const { t } = useTranslation();

    /**
     * Toast 
     */
    const toast = useToast();

    /**
     * 
     * @param Copy Url
     */
    const copyURl = (): void => {
        const currentURl: string = window.location.href;
        navigator.clipboard.writeText(currentURl).then(() => {
            toast({
                description: 'Copy Successfully',
                duration: 3000,
                isClosable: true,
                status: 'success',
            })
        })
    }
    /**
     * @returns
     */
    return (
        <VStack gap={4} alignItems={'start'}>
            <Flex justifyContent={'space-between'} w={'full'}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={'bold'}>
                        Hanish Bansal
                    </Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"}>HanishBansal</Text>
                        <Text fontSize={{
                            base:'xs',
                            md:'sm',
                            lg:'md',
                        }} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={'full'}>threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        name='Hanish Bansal'
                        src='Hello'
                        size={{
                            base:'md',
                            md:'xl'
                        }} 
                    ></Avatar>
                </Box>
            </Flex>
            <Text>Hello</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>3.2k followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link to={'/'} color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={'pointer'} />
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={'pointer'} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem onClick={copyURl} bg={"gray.dark"}>{t(translateConstant.copyLink)}</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader