import React from 'react';
import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';

import { formatEther } from '@ethersproject/units';
import { useEthers, useTokenBalance, useEtherBalance } from '@usedapp/core';
import { tokenList } from '../constants';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    handleActive: (arg: boolean) => void;
};

export default function AccountModal({ isOpen, onClose, handleActive }: Props) {
    const { account, deactivate } = useEthers();

    function handleDeactivateAccount() {
        deactivate();
        handleActive(false);
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent
                background="gray.900"
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl"
            >
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    Your Account
                </ModalHeader>

                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: 'whiteAlpha.700',
                    }}
                />

                <ModalBody pt={0} px={4}>
                    <Box
                        borderRadius="3xl"
                        border="1px"
                        borderStyle="solid"
                        borderColor="gray.600"
                        px={5}
                        pt={4}
                        pb={2}
                        mb={3}
                    >
                        <Flex justifyContent="space-between" alignItems="center" mb={3}>
                            <Text color="gray.400" fontSize="sm">
                                Connected with MetaMask
                            </Text>
                            <Button
                                variant="outline"
                                size="sm"
                                borderColor="blue.800"
                                borderRadius="3xl"
                                color="blue.500"
                                fontSize="13px"
                                fontWeight="normal"
                                px={2}
                                height="26px"
                                _hover={{
                                    background: 'none',
                                    borderColor: 'blue.300',
                                    textDecoration: 'underline',
                                }}
                                onClick={handleDeactivateAccount}
                            >
                                Disconnect
                            </Button>
                        </Flex>

                        <Flex alignContent="center" m={3}>
                            <Button
                                variant="link"
                                color="gray.400"
                                fontWeight="normal"
                                fontSize="sm"
                                _hover={{
                                    textDecoration: 'none',
                                    color: 'whiteAlpha.800',
                                }}
                            >
                                <CopyIcon mr={1} />
                                Copy Address
                            </Button>

                            <Link
                                fontSize="sm"
                                display="flex"
                                alignItems="center"
                                href={`https://ropsten.etherscan.io/address/${account}`}
                                isExternal
                                color="gray.400"
                                ml={6}
                                _hover={{
                                    color: 'whiteAlpha.800',
                                    textDecoration: 'underline',
                                }}
                            >
                                <ExternalLinkIcon mr={1} />
                                View on Explorer
                            </Link>
                        </Flex>

                        <Text color="white" fontSize="sm" mt="2" mb={3}>
                            Balance
                        </Text>
                        <Flex alignItems="center" justifyContent="space-between" mb={2} lineHeight={1}>
                            <Text color="gray.400" fontSize="sm">
                                Eth:
                            </Text>
                            <Text color="gray.400" fontSize="xl" fontWeight="semibold" ml="2">
                                {parseFloat(formatEther(useEtherBalance(account) || 0)).toFixed(3)}
                            </Text>
                        </Flex>
                        {tokenList.map((token: Record<string, string>) => (
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                mb={2}
                                lineHeight={1}
                                key={token.token}
                            >
                                <Text color="gray.400" fontSize="sm">
                                    {token.token}:
                                </Text>
                                <Text color="gray.400" fontSize="xl" fontWeight="semibold" ml="2">
                                    {parseFloat(formatEther(useTokenBalance(token.address, account) || 0)).toFixed(3)}
                                </Text>
                            </Flex>
                        ))}
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
