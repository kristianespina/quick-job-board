import React, { useState } from 'react'
import "./style.scss"

import TextInput from '../../components/TextInput'
import JobCard from '../../components/JobCard'
import JobDetails from '../../components/JobDetails'

const JobListing = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="h-screen pt-24 joblistingpage">

      <div className="w-full mb-24 pt-12">
        <div className="flex justify-center">
          <div className="">
            <p className="text-5xl text-indigo-600 pt-24 mb-4 font-bold">Job Listings</p>
            <form className="flex flex-row gap-4">
              <div className="w-96">
                <TextInput placeholder="Search for job title, or company" state={search} setValue={setSearch} />
              </div>
              <div>
                <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="container">
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <JobCard />
              <JobCard />
            </div>
            <div className="w-8/12">
              <JobDetails />
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default JobListing
