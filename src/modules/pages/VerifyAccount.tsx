import { Box, Button, Flex, HStack, Heading, PinInput, PinInputField, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { sendOtp, signup } from '../../services/operations/authApi';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SignUpData {
    name: string;
    username: string;
    email: string;
    password: string;
    otp: string;
}

const VerifyAccount: React.FC = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState<string>(''); // State to store OTP value
    const { signData } = useSelector((state: any) => state.auth);
    const toast = useToast();

    const handleOtpChange = (value: string) => {
        setOtp(value);
    };

    const signUpFormHandel = async () => {
        const response = await sendOtp({ email: signData.email, username: signData.username });
        if (response?.data?.success) {
            toast({
                description: 'Resend Successfully...',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const createAccount = async () => {
        if (signData) {
            const updatedSignUpData: SignUpData = {
                ...signData,
                otp: otp,
            };

            const response = await signup(updatedSignUpData);
            if (response?.data.success) {
                toast({
                    description: 'Account Created Successfully...',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                navigate('/auth');
            }

        }
    }

    return (
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Verify Account
                    </Heading>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
                    <HStack justifyContent={'center'} alignItems={'center'}>
                        <PinInput otp onChange={handleOtpChange} value={otp}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>
                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText='Submitting'
                            size='lg'
                            bg={useColorModeValue("gray.600", "gray.700")}
                            color={"white"}
                            _hover={{
                                bg: useColorModeValue("gray.700", "gray.800"),
                            }}
                            onClick={createAccount}
                        >
                            Verify Account
                        </Button>
                    </Stack>
                    <Text onClick={signUpFormHandel} textAlign={'right'} color={"gray.light"} cursor={'pointer'}>Resend</Text>
                </Box>
            </Stack>
        </Flex>
    )
}

export default VerifyAccount;
