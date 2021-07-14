import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import { ExportToCsv } from 'export-to-csv';
import "./style.scss"

import { apiRequest } from '../../utils/api'

import { useDebounce } from "../../hooks/useDebounce"
import TextInput from '../../components/TextInput'
import JobCard from '../../components/JobCard'
import JobDetails from '../../components/JobDetails'
import Results from '../../components/Results';
import { NotFound } from '../../components/SVG';


const JobListing = () => {
  const [search, setSearch] = useState("")
  const [details, setDetails] = useState({})
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(0);
  const [resultsFound, setResultsFound] = useState(-1);

  const debouncedSearch = useDebounce(search, 1000);
  let params = new URLSearchParams(useLocation().search)


  // Keep track of last search query
  const lastQuery = useRef("")
  const limitPerPage = parseInt(process.env.REACT_APP_LIMIT_PER_PAGE);

  /**
   * Fetches paginated jobs
   * 
   * @param {Object} payload 
   * @returns 
   */
  const fetchJobList = async (payload) => {
    // Skip if the last query is unchanged.
    if (payload.position === lastQuery.current) return;

    const options = {
      method: "POST",
      endpoint: "/jobs/search",
      payload: payload
    }
    const response = await apiRequest(options);
    // Update list
    if (response && response.status === 200) {
      setJobs(response.data.docs)
      setResultsFound(response.data.total)

      // Update the reference if and only if the request is successful
      lastQuery.current = payload.position
    }
  }

  /**
   * Fetches unpaginated jobs
   * 
   * @param {Object} payload 
   * @returns 
   */
  const fetchAllJobs = async (payload) => {
    const options = {
      method: "POST",
      endpoint: "/jobs/export",
      payload: payload
    }
    const response = await apiRequest(options);
    return response
  }

  const exportData = async () => {
    const response = await fetchAllJobs({
      position: (debouncedSearch || "")
    })

    if (response && response.status === 200) {
      const data = response.data.map(el => {
        return {
          ...el,
          applicants: `"${el.applicants.join(",")}"`
        }
      })

      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Job Listing Data',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename: 'jobs'
      };

      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(data);
    }
  }
  /**
   * Event Handlers
   */
  const handlePrevious = () => {
    setPage(Math.max(0, page - 1))
  }
  const handleNext = () => {
    if (jobs.length >= limitPerPage)
      setPage(page + 1)
  }
  const handleClear = () => {
    setResultsFound(-1);
  }
  useEffect(() => {
    // Parse job listings
    fetchJobList({
      position: (debouncedSearch || ""),
      page: page + 1,
      limit: limitPerPage
    });
  }, [debouncedSearch, page, limitPerPage])

  // Reset Page to zero when search query is modified
  useEffect(() => {
    setPage(0)
  }, [debouncedSearch])

  // On Initial Mount
  useEffect(() => {
    const position = params.get("position")
    setSearch(position)

    fetchJobList({
      position: position,
      page: page + 1,
      limit: limitPerPage
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="h-screen pt-24 joblistingpage">

      <div className="w-full mb-24 pt-12">
        <div className="flex justify-center">
          <div className="">
            <p className="text-5xl text-indigo-600 pt-24 mb-4 font-bold text-center">Job Listings</p>
            <div className="flex flex-row gap-4">
              <div>
                {resultsFound >= 0 ?
                  <Results handleClear={handleClear} resultsFound={resultsFound} exportData={exportData} />
                  :
                  <div className="w-96">
                    <TextInput placeholder="Search for job title, or position" state={search} setValue={setSearch} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pb-24">
        <div className="container">
          {resultsFound > 0 ? (
            <div className="flex flex-row gap-4">
              <div className="w-5/12 px-12">
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
          )
            :
            <NotFound />
          }
        </div>
      </div>


    </div>
  )
}

export default JobListing
