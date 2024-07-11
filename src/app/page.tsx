'use client'
import { useEffect, useState } from "react";
import Jobs from "./jobs/page";
import LoadingJobsComponent from "./jobs/loadingJobs";

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  }, [setLoading])

  return (
    <>
      {loading ? (
        <LoadingJobsComponent/>
      ) : (
        <Jobs />
      )}
    </>
  );
}
