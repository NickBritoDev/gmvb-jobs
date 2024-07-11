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
  useToast
} from '@chakra-ui/react'
import FormJobsComponent from './formJobs'

export default function AgendaJobsComponent({ job, auth }: any) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const agendar = () => {
    onClose()
    toast({
      title: 'Agendado com sucesso.',
      description: "Fique atento ao seu telefone, em breve recebera novas informações sobre o agendamento.",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
  }

  return (
    <>
      <Button onClick={onOpen} w={'100%'} colorScheme='green'>
        Agendar Entrevista
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent h={'100vh'}>
          <DrawerCloseButton mt={8} />
          <DrawerHeader mt={6}>Agendar Entrevista</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column">
              <Text mb={4} fontWeight="bold">Datas e Horarios disponíveis:</Text>
              {job.agenda.datas.map((data: any, index: number) => (
                <Flex boxShadow={'md'} p={4} rounded={'2xl'} key={index} alignItems="center" justifyContent="space-between" mb={4}>
                  <Text>{data.dia} às {data.hora}</Text>
                  {auth ?
                    <Button onClick={agendar} colorScheme='green'>
                      Agendar
                    </Button>
                    :
                    <FormJobsComponent />
                  }
                </Flex>
              ))}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button w={'100%'} mr={3} onClick={onClose}>
              Voltar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
