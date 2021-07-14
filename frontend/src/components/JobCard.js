import React from 'react'
import moment from "moment"
import MockLogo from "./MockLogo"

const JobCard = ({ data, onClick }) => {
  return (
    <div className="card flex flex-row gap-4 px-4 py-4 my-4" onClick={onClick}>
      <div className="w-5/12">
        <MockLogo company={data && data.company} />
      </div>
      <div className="w-7/12">
        <p className="text-indigo-600 font-bold">{data && data.position}</p>
        <p className="">{data && data.company}</p>
        <p>
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">{data && data.location}</span>
        </p>
        <p className="mt-4">{data && data.created_at && moment(data.created_at).fromNow()}</p>
      </div>
    </div >
  )
}

export default JobCard
