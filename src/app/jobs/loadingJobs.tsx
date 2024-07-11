import { Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function LoadingJobsComponent() {
  return (
    <Flex textAlign={"center"} p={4} flexDir={"column"} w={'100%'} h={'100vh'} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={'xl'} color="green" />
      <Text mt={6} fontSize={18} fontWeight={'semibold'}>Aguarde enquanto carregamos as melhores vagas para você!</Text>
    </Flex>
  )
}
