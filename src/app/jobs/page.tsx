import { Flex } from '@chakra-ui/react'
import agendaJobs from '@/app/json/cards-jobs.json'
import React from 'react'
import DescricaoJobsComponent from './descricaoJobs'

export default function Jobs() {
  const filter = null;

  const filteredJobs = filter ? agendaJobs.filter(job => job.id === filter) : agendaJobs;

  return (
    <Flex alignItems={'center'} justifyContent={'center'} bg={'white'} flexDir={'column'}>
      {filteredJobs.map((job) => (
        <DescricaoJobsComponent key={job.id} job={job} />
      ))}
    </Flex>
  )
}
