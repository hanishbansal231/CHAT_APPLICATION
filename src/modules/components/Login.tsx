import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { login } from '../../services/operations/authApi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { setIsLoading, setUser } from '../../redux/slice/authSlice';

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const toast = useToast()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<any>({
        email: '',
        password: '',
    })

    function handelOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setLoginData((prev: any) => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    const signUpFormHandel = async (): Promise<void> => {
        dispatch(setIsLoading(true));
        const response = await login(loginData);
        dispatch(setIsLoading(false));
        if (response?.data?.success) {
            console.log(response);
            dispatch(setUser(response?.data?.data));
            navigate('/');
            toast({
                description: response?.data?.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Login
                    </Heading>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <HStack>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Email address or Username</FormLabel>
                            <Input
                                type='email'
                                name='email'
                                onChange={handelOnChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={!showPassword ? "password" : "text"}
                                    name='password'
                                    onChange={handelOnChange}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        onClick={() => setShowPassword(!showPassword)}
                                        variant={"ghost"}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText='Submitting'
                                size='lg'
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={"white"}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={signUpFormHandel}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <Link color={"blue.400"}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login