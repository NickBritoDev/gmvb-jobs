'use client'
import React, { useState } from 'react';
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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  useToast,
  Box,
} from '@chakra-ui/react';

interface FormValues {
  nome: string;
  email: string;
  telefone: string;
  origem: string;
}

const FormJobsComponent: React.FC = ({ job }: any) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exibeFormPerguntas, setExibeFormPerguntas] = useState(true);
  const [exibeForm, setExibeForm] = useState(false);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    telefone: Yup.string().required('O telefone é obrigatório'),
    origem: Yup.string().required('Selecione a origem'),
  });

  const handleSubmit = (values: FormValues, { resetForm }: any) => {
    resetForm();
    onClose();
    setExibeFormPerguntas(true)
    setExibeForm(false)

    toast({
      title: 'Agendado com sucesso.',
      description:
        'Fique atento ao seu telefone, em breve receberá novas informações sobre o agendamento.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const calcularPontos = (values: any) => {
    let calculatedPoints = 0;

    job.perguntas.forEach((question: any) => {
      const fieldName = question.pergunta.replace(/\s+/g, '');
      const userAnswer = values[fieldName];

      if (userAnswer === 'SIM') {
        calculatedPoints += 2;
      } else if (userAnswer === 'NAO') {
        calculatedPoints += 1;
      }
    });

    if (calculatedPoints > 5) {
      setExibeForm(true);
      setExibeFormPerguntas(false)
    } else {
      setExibeForm(false);
      setExibeFormPerguntas(false)
      onClose()
      toast({
        title: 'Não foi possivel prosseguir.',
        description:
          'Infelizemente não esta apto para a vaga, tente novamente quando se qualificar.',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Agendar
      </Button>

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
                  origem: '',
                  ...job.perguntas.reduce((acc: any, question: any) => {
                    acc[question.pergunta.replace(/\s+/g, '')] = '';
                    return acc;
                  }, {}),
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form>
                    <Flex h={'85vh'} flexDir={'column'} justifyContent={'space-between'}>
                      <Flex mt={8} flexDir={'column'} gap={4}>
                        {exibeFormPerguntas && job.perguntas.map((question: any, index: any) => (
                          <Field key={index} name={question.pergunta.replace(/\s+/g, '')}>
                            {({ field }: any) => (
                              <FormControl>
                                <FormLabel>{question.pergunta}</FormLabel>
                                <Select
                                  {...field}
                                  placeholder="Selecione uma opção"
                                  onChange={(e) => setFieldValue(field.name, e.target.value)}
                                >
                                  <option value="SIM">SIM</option>
                                  <option value="NAO">NÃO</option>
                                </Select>
                              </FormControl>
                            )}
                          </Field>
                        ))}

                        <Box flexDir={'column'} gap={4} display={exibeForm ? 'flex' : 'none'}>
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
                        </Box>
                      </Flex>

                      <Button display={exibeForm ? 'flex' : 'none'} w={'100%'} mt="4" colorScheme="green" type="submit">
                        Enviar
                      </Button>
                      <Button
                        display={!exibeForm ? 'flex' : 'none'}
                        w={'100%'}
                        mt="4"
                        colorScheme="green"
                        onClick={() => calcularPontos(values)}
                      >
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

