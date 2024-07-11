'use client'
import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import DescricaoJobsComponent from './descricaoJobs';
import agendaJobs from '@/app/json/cards-jobs.json';
import FiltroJobsComponent from './filtroJobs';

const Jobs: React.FC = () => {
  const auth = false
  const [filters, setFilters] = useState<any>({
    localizacao: [],
    vaga: [],
    vagaId: null,
  });

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
      <FiltroJobsComponent filters={filters} handleCheckboxChange={handleCheckboxChange} />

      {filteredJobs.map((job) => (<DescricaoJobsComponent auth={auth} key={job.id} job={job} />))}
    </Flex>
  );
};

export default Jobs;
