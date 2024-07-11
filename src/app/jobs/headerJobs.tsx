import React from 'react'
import logo from '../../../public/grupomaisvalor_logo.jpg'
import { Flex, Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/next-js'

export default function HeaderJobsComponent() {
  return (
   <Flex gap={4} alignItems={'center'} justifyContent={'center'} mt={-10}>
    <Text fontSize={22} fontWeight={'bold'} color={'#229544'}>GMVB</Text>
    <Image borderRadius={'50%'} boxShadow={'lg'} w={'80px'} src={logo} alt='logo mais valor'/>
    <Text fontSize={22} fontWeight={'bold'} color={'#229544'}>JOBS</Text>
   </Flex>
  )
}
