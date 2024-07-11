'use client'
import React from 'react';
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Checkbox,
  Button,
} from '@chakra-ui/react';
import { FcFilledFilter } from 'react-icons/fc';
import { Image } from '@chakra-ui/next-js';
import logo from '../../../public/grupomaisvalor_logo.jpg';
import agendaJobs from '@/app/json/cards-jobs.json';

type FiltroJobsComponentProps = {
  filters: {
    localizacao: string[];
    vaga: string[];
    vagaId: number | null;
  };
  handleCheckboxChange: (type: string, value: string | number) => void;
};

const FiltroJobsComponent: React.FC<FiltroJobsComponentProps> = ({ filters, handleCheckboxChange }) => {
  return (
    <Menu>
      <MenuButton
        h={'50px'}
        color={'black'}
        bg={'white'}
        colorScheme={'transparent'}
        rounded={0}
        _active={{ rounded: 0 }}
        boxShadow={'lg'}
        p={2}
        alignItems={'center'}
        justifyContent={'space-between'}
        w={'100%'}
        pos={'fixed'}
        top={0}
        left={0}
        as={Button}
        textAlign={'left'}
        fontSize={18}
        fontWeight={'semibold'}
        rightIcon={<FcFilledFilter size={22} />}
      >
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'} justifyContent={'center'}>
            <Text textAlign={'left'} color={'#229544'}>GMVB</Text>
            <Image  borderRadius={'50%'} w={'45px'} src={logo} alt='logo mais valor' />
            <Text textAlign={'left'} color={'#229544'}>JOBS</Text>
          </Flex>
          <Text textAlign={'left'} mb={-0.5}>Filtros</Text>
        </Flex>
      </MenuButton>
      <MenuList
        h={'100vh'}
        w={'100vw'}
        mt={-2}
        rounded={0}
        display={'flex'}
        flexDir={'column'}
        pl={2}
      >
        <Text fontWeight={'semibold'}>Localização</Text>
        {Array.from(new Set(agendaJobs.map(job => job.cidade))).map(cidade => (
          <Checkbox
            key={cidade}
            onChange={() => handleCheckboxChange('localizacao', cidade)}
            isChecked={filters.localizacao.includes(cidade)}
          >
            {cidade}
          </Checkbox>
        ))}

        <Text mt={4} fontWeight={'semibold'}>Vagas</Text>
        {Array.from(new Set(agendaJobs.map(job => job.vaga))).map(vaga => (
          <Checkbox
            key={vaga}
            onChange={() => handleCheckboxChange('vaga', vaga)}
            isChecked={filters.vaga.includes(vaga)}
          >
            {vaga}
          </Checkbox>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FiltroJobsComponent;
