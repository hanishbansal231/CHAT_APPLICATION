import { Flex, Stack, Heading, useColorModeValue, HStack, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react'
import React from 'react'

const ForgotPassword: React.FC = () => {

    const forgotPasswordFormHandel = () =>{

    }

    const handelOnChange = () => {

    }

    return (
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Forgot Password
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
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText='Submitting'
                                size='lg'
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={"white"}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={forgotPasswordFormHandel}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default ForgotPassword