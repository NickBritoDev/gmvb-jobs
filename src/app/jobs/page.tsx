'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import jwt from 'jsonwebtoken';
import DescricaoJobsComponent from './descricaoJobs';
import agendaJobs from '@/app/json/cards-jobs.json';
import FiltroJobsComponent from './filtroJobs';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { maskTelefone } from '../helpers/mask-telefone';
import HeaderJobsComponent from './headerJobs';

interface TokenPayload {
  id_vaga: number;
  telefone: number;
  nome: string;
}

const Jobs: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(false)
  const [nome, setNome] = useState<string>('')
  const [telefone, setTelefone] = useState<number>(0)
  const [filters, setFilters] = useState<any>({
    localizacao: [],
    vaga: [],
    vagaId: null,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('tk');

    if (token) {
      const decoded = jwt.decode(token) as TokenPayload;
      setTelefone(decoded?.telefone)
      setNome(decoded?.nome)
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        vagaId: decoded.id_vaga,
      }));
      setAuth(true)
    }
  }, []);

  const handleCheckboxChange = (type: string, value: string | number) => {
    const newFilters = { ...filters };
    if (type === 'vagaId') {
      newFilters.vagaId = value as number;
    } else {
      if (newFilters[type].includes(value as string)) {
        newFilters[type] = newFilters[type].filter((item: string) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
    }
    setFilters(newFilters);
  };

  const filterJobs = (job: any) => {
    if (
      (filters.localizacao.length === 0 || filters.localizacao.includes(job.cidade)) &&
      (filters.vaga.length === 0 || filters.vaga.includes(job.vaga)) &&
      (filters.vagaId === null || job.id === filters.vagaId)
    ) {
      return true;
    }
    return false;
  };

  const filteredJobs = agendaJobs.filter(filterJobs);

  return (
    <Flex pt={14} alignItems={'center'} justifyContent={'center'} bg={'white'} flexDir={'column'}>
      {auth ? (
        <HeaderJobsComponent />
      ) : (
        <FiltroJobsComponent filters={filters} handleCheckboxChange={handleCheckboxChange} />
      )}

      {nome !== '' && telefone !== 0 &&
        <Flex pb={10} borderBottom={'1px solid #c6c6c6'} pl={2} alignItems={'flex-start'} justifyContent={'center'} w={'100%'} mt={10} flexDir={'column'}>
          <Heading>Bem vindo(a)</Heading>
          <Flex alignItems={'center'} justifyContent={'flex-start'} gap={2}>
            <FaRegUserCircle color='gray' size={22} />
            <Text fontSize={18} fontWeight={'bold'}>{nome}</Text>
          </Flex>
          <Flex alignItems={'center'} justifyContent={'flex-start'} gap={2}>
            <IoLogoWhatsapp size={22} color='green' />
            <Text fontSize={18} fontWeight={'semibold'}>{maskTelefone(String(telefone))}</Text>
          </Flex>
        </Flex>
      }

      {filteredJobs.map((job) => (<DescricaoJobsComponent auth={auth} key={job.id} job={job} />))}
    </Flex>
  );
};

export default Jobs;
