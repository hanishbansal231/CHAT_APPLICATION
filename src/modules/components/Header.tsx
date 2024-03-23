import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

const Header: React.FC = () => {
    const { colorMode,toggleColorMode } = useColorMode();
    return (
        <Flex justifyContent={'center'} mt={6} mb={12}>
            <Image
                cursor={'pointer'}
                alt={'logo'}
                w={6}
                src={colorMode === 'dark' ? 'https://cdn-icons-png.flaticon.com/128/869/869869.png' : 'https://cdn-icons-png.flaticon.com/128/869/869869.png'}
                onClick={toggleColorMode}
            />
        </Flex>
    )
}

export default Header