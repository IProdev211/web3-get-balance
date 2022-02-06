import React, { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

type Props = {
    children?: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <Flex
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="flex-start"
            h="100vh"
            bg="gray.800"
            padding="20px"
        >
            {children}
        </Flex>
    );
}
