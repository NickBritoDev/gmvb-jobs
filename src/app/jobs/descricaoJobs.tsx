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
  Divider
} from '@chakra-ui/react'
import { MdOutlineWork } from 'react-icons/md'
import AgendaJobsComponent from './agendaJobs'

export default function DescricaoJobsComponent({ job, auth }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Flex onClick={onOpen} borderBottom={'1px solid #c6c6c6'} key={job.id} w={'100%'} p={2}>
        <Flex w={'100%'} flexDir={'column'}>
          <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={18} fontWeight={'bold'}>{job.vaga}</Text>
            <MdOutlineWork size={22} color='#229544' />
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
          <DrawerCloseButton />
          <DrawerHeader>Detalhes da Vaga</DrawerHeader>

          <DrawerBody>
            <Text fontSize={18} fontWeight={'bold'} mb={4}>{job.detalhes.vaga}</Text>

            <Flex mb={4} flexDir={'column'} w={'max-content'} rounded={'2xl'}>
              <Text fontWeight={'bold'}>Salário:</Text>
              <Text >R$ {job.detalhes.salario.toFixed(2)}</Text>
            </Flex>

            <Text fontWeight={'bold'}>Descrição:</Text>
            <ul>
              {job.detalhes.descricao.map((desc: string, index: number) => (
                <li key={index}>
                  <Text mb={2}>{desc}</Text>
                </li>
              ))}
            </ul>

            <Divider my={4} />

            <Text fontWeight={'bold'}>Responsabilidades:</Text>
            <ul>
              {job.detalhes.responsabilidades.map((resp: string, index: number) => (
                <li key={index}>
                  <Text mb={2}>{resp}</Text>
                </li>
              ))}
            </ul>

            <Divider my={4} />

            <Text fontWeight={'bold'}>Requisitos:</Text>
            <ul>
              {job.detalhes.requisitos.map((req: string, index: number) => (
                <li key={index}>
                  <Text mb={2}>{req}</Text>
                </li>
              ))}
            </ul>

            <Divider my={4} />

            <Text fontWeight={'bold'}>Diferenciais:</Text>
            <ul>
              {job.detalhes.diferenciais.map((dif: string, index: number) => (
                <li key={index}>
                  <Text mb={2}>{dif}</Text>
                </li>
              ))}
            </ul>

            <Divider my={4} />

            <Text fontWeight={'bold'}>Benefícios:</Text>
            <ul>
              {job.detalhes.beneficios.map((ben: string, index: number) => (
                <li key={index}>
                  <Text mb={2}>{ben}</Text>
                </li>
              ))}
            </ul>
          </DrawerBody>

          <DrawerFooter display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={1}>
            <AgendaJobsComponent auth={auth} job={job}/>
            <Button w={'100%'} onClick={onClose}>Fechar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

