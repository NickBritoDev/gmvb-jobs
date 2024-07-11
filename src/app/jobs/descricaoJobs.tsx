'use client'
import React, { useRef } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import './style/descricaoJobs.css'
import { MdOutlineWork } from 'react-icons/md'
import AgendaJobsComponent from './agendaJobs'

export default function DescricaoJobsComponent({ job, auth }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const detalhesHtml = job.detalhes;

  return (
    <>
      <Flex onClick={onOpen} borderBottom={'1px solid #c6c6c6'} key={job.id} w={'100%'} p={2}>
        <Flex w={'100%'} flexDir={'column'}>
          <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={18} fontWeight={'bold'}>{job.vaga}</Text>
            <MdOutlineWork size={22} color='brown' />
          </Flex>
          <Flex fontWeight={'semibold'} alignItems={'center'} justifyContent={'flex-start'} gap={1}>
            <Text>Vagas disponíveis:</Text>
            <Text fontWeight={'bold'}>{job?.agenda?.disponiveis}</Text>
          </Flex>
          <Flex fontWeight={'semibold'} alignItems={'center'} justifyContent={'flex-start'} gap={1}>
            <Text>{job.cidade} - </Text>
            <Text>{job.estado}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={5} />
          <DrawerHeader mt={4}>Detalhes da Vaga</DrawerHeader>

          <DrawerBody dangerouslySetInnerHTML={{ __html: detalhesHtml }} />

          <DrawerFooter display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={1}>
            <AgendaJobsComponent auth={auth} job={job} />
            <Button w={'100%'} onClick={onClose}>Fechar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

