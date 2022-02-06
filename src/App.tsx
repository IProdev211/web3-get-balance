import React, { useState } from 'react';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import theme from './theme';
import Layout from './components/Layout';
import ConnectButton from './components/ConnectButton';
import GetBalance from './components/GetBalance';
import AccountModal from './components/AccountModal';
import '@fontsource/inter';

function App() {
    const [active, setActive] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <DAppProvider config={{}}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <ConnectButton handleOpenModal={onOpen} handleActive={(e: boolean) => setActive(e)} />
                    {active && <GetBalance />}
                </Layout>
                <AccountModal isOpen={isOpen} onClose={onClose} handleActive={(e: boolean) => setActive(e)} />
            </ChakraProvider>
        </DAppProvider>
    );
}

export default App;
