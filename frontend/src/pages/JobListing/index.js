import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import "./style.scss"

import { apiRequest } from '../../utils/api'

import { useDebounce } from "../../hooks/useDebounce"
import TextInput from '../../components/TextInput'
import JobCard from '../../components/JobCard'
import JobDetails from '../../components/JobDetails'


const JobListing = () => {
  const [search, setSearch] = useState("")
  const [details, setDetails] = useState({})
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(search, 500);

  let params = new URLSearchParams(useLocation().search)
  console.log("params", params.get("position"))

  const limitPerPage = parseInt(process.env.REACT_APP_LIMIT_PER_PAGE);
  const fetchJobList = async (payload) => {
    const options = {
      method: "POST",
      endpoint: "/jobs/search",
      payload: payload
    }
    const response = await apiRequest(options);

    // Update list
    if (response && response.status === 200) {
      setJobs(response.data)
    }
  }

  const handlePrevious = () => {
    setPage(Math.max(0, page - 1))
  }
  const handleNext = () => {
    if (jobs.length >= limitPerPage)
      setPage(page + 1)
  }
  useEffect(() => {
    // Parse job listings
    fetchJobList({
      position: debouncedSearch,
      skip: limitPerPage * page,
      limit: parseInt(limitPerPage)
    });
  }, [debouncedSearch, page])

  // OnMount
  useEffect(() => {
    setSearch(params.get("position"))
  }, [])

  return (
    <div className="h-screen pt-24 joblistingpage">

      <div className="w-full mb-24 pt-12">
        <div className="flex justify-center">
          <div className="">
            <p className="text-5xl text-indigo-600 pt-24 mb-4 font-bold">Job Listings</p>
            <div className="flex flex-row gap-4">
              <div className="w-96">
                <TextInput placeholder="Search for job title, or position" state={search} setValue={setSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-24">
        <div className="container">
          <div className="flex flex-row gap-4">
            <div className="w-5/12 overflow-y-scroll px-12" style={{ maxHeight: "900px" }}>
              {jobs.map(data =>
                <JobCard key={data.id} data={data} onClick={() => setDetails(data)} />
              )}
              <div className="inline-flex w-full">
                <button onClick={handlePrevious} className="w-full bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                  Previous
                </button>
                <button onClick={handleNext} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
            <div className="w-7/12">
              <JobDetails data={details} />
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default JobListing
