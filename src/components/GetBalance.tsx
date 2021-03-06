import React, { useState } from 'react';
import { Box, Flex, Text, Input } from '@chakra-ui/react';

import { formatEther } from '@ethersproject/units';
import { useTokenBalance, useEtherBalance } from '@usedapp/core';
import { tokenList } from '../constants';

export default function GetBalance() {
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const addr = e.target.value;
        if (/0x[a-fA-F0-9]{40}/.test(addr)) {
            setAddress(addr);
        } else {
            setError(true);
        }
    };

    return (
        <Box
            width="md"
            borderWidth="1px"
            borderRadius="24"
            overflow="hidden"
            margin="auto"
            p="5"
            border="2px solid rgb(45, 55, 72)"
        >
            <Text color="white" fontSize="lg" fontWeight="medium">
                Get Balance
            </Text>
            <Box pt="2">
                <Input variant="outline" placeholder="Enter the address" color="white" onChange={handleChangeAddress} />
                {error && (
                    <Text color="red.300" fontSize="xs" mt="1" ml="2">
                        Invalid Address
                    </Text>
                )}

                <Box p="5" pb="2" mt="4" border="2px solid rgb(45, 55, 72)" borderRadius="24">
                    <Text color="white" fontSize="sm" mb={3}>
                        Balance
                    </Text>
                    <Flex alignItems="center" justifyContent="space-between" mb={2} lineHeight={1}>
                        <Text color="gray.400" fontSize="sm">
                            ETH:
                        </Text>
                        <Text color="gray.400" fontSize="xl" fontWeight="semibold" ml="2">
                            {parseFloat(formatEther(useEtherBalance(address) || 0)).toFixed(3)}
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
                                {parseFloat(formatEther(useTokenBalance(token.address, address) || 0)).toFixed(3)}
                            </Text>
                        </Flex>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
