import { Flex, Stack, useColorModeValue, Heading, FormControl, Center, Avatar, Button, Input, FormLabel } from '@chakra-ui/react'
import { useFileUploader } from '../../hooks/fileUpload';
import React, { useEffect, useRef, useState } from 'react'
import { updateProfile } from '../../services/operations/profileApi';
import { useDecryptedToken } from '../../utils/app.util';

const UserProfilePage: React.FC = () => {

    interface UpdateUserInterface {
        profilePicture: File | null | string;
        name: string;
        email: string;
        username: string;
        bio: string;
    }

    const decryptedToken = useDecryptedToken();
    const { fileUpload, imgUrl, file } = useFileUploader();
    const fileRef = useRef<HTMLInputElement>(null);
    const [userUpdate, setUserUpdate] = useState<UpdateUserInterface>({
        profilePicture: null,
        name: '',
        email: '',
        username: '',
        bio: '',
    });

    useEffect(() => {
        if (file) {
            setUserUpdate((prev) => ({
                ...prev,
                profilePicture: file
            }));
        }
    }, [file]);

    const handelInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserUpdate((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handelSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const response = await updateProfile(userUpdate, decryptedToken);
        if (response?.data?.success) {
            console.log(response);
        }

    }

    return (
        <form onSubmit={handelSubmit}>
            <Flex align={"center"} justify={"center"} my={6}>
                <Stack
                    spacing={4}
                    w={"full"}
                    maxW={"md"}
                    bg={useColorModeValue("white", "gray.dark")}
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id='avtar'>
                        <Stack direction={["column", "row"]} spacing={6}>
                            <Center>
                                <Avatar src={imgUrl ?? ''} size='xl' boxShadow={"md"} />
                            </Center>
                            <Center w='full'>
                                <Button w='full' onClick={() => fileRef.current?.click()}>
                                    Change Avatar
                                </Button>
                                <Input type='file' hidden ref={fileRef} onChange={fileUpload} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Full name</FormLabel>
                        <Input
                            placeholder='Full name'
                            value={userUpdate.name}
                            onChange={handelInput}
                            name='name'
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder='User name'
                            value={userUpdate.username}
                            onChange={handelInput}
                            name='username'
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder='Email address'
                            value={userUpdate.email}
                            onChange={handelInput}
                            name='email'
                            _placeholder={{ color: "gray.500" }}
                            type='email'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder='Bio'
                            value={userUpdate.bio}
                            onChange={handelInput}
                            name='bio'
                            _placeholder={{ color: "gray.500" }}
                            type='text'
                        />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            bg={"red.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={"green.400"}
                            color={"white"}
                            w='full'
                            _hover={{
                                bg: "green.500",
                            }}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}

export default UserProfilePage