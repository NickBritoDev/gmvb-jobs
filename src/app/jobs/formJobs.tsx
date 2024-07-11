'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Box,
  useToast,
} from '@chakra-ui/react';

interface FormValues {
  nome: string;
  email: string;
  telefone: string;
  origem: string;
}

const FormJobsComponent: React.FC = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    telefone: Yup.string().required('O telefone é obrigatório'),
    origem: Yup.string().required('Selecione a origem')
  });

  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    console.log(values);
    resetForm();
    onClose()

    toast({
      title: 'Agendado com sucesso.',
      description: "Fique atento ao seu telefone, em breve recebera novas informações sobre o agendamento.",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
  };

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>Agendar</Button>

      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulário de Contato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4" align="stretch">
              <Formik
                initialValues={{
                  nome: '',
                  email: '',
                  telefone: '',
                  origem: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Flex h={'85vh'} flexDir={'column'} justifyContent={'space-between'}>
                      <Flex mt={8} flexDir={'column'} gap={4}>
                        <Field name="nome">
                          {({ field }: any) => (
                            <FormControl isInvalid={!!errors.nome && touched.nome}>
                              <FormLabel htmlFor="nome">Nome</FormLabel>
                              <Input {...field} id="nome" placeholder="Seu nome" />
                              <FormErrorMessage>{errors.nome}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="email">
                          {({ field }: any) => (
                            <FormControl isInvalid={!!errors.email && touched.email}>
                              <FormLabel htmlFor="email">E-mail</FormLabel>
                              <Input {...field} id="email" placeholder="Seu e-mail" />
                              <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="telefone">
                          {({ field }: any) => (
                            <FormControl isInvalid={!!errors.telefone && touched.telefone}>
                              <FormLabel htmlFor="telefone">Telefone</FormLabel>
                              <Input {...field} id="telefone" placeholder="Seu telefone" />
                              <FormErrorMessage>{errors.telefone}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="origem">
                          {({ field }: any) => (
                            <FormControl isInvalid={!!errors.origem && touched.origem}>
                              <FormLabel htmlFor="origem">Origem</FormLabel>
                              <Select {...field} id="origem" placeholder="Selecione a origem">
                                <option value="whatsapp">WhatsApp</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                              </Select>
                              <FormErrorMessage>{errors.origem}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Button w={'100%'} mt="4" colorScheme="green" type="submit">
                        Enviar
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </VStack>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>

  );
};

export default FormJobsComponent;
