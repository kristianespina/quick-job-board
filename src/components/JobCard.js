import React from 'react'
import PlaceholderImage from "../assets/150.png"

const JobCard = () => {
  return (
    <div className="card flex flex-row gap-4 px-4 py-4 my-4">
      <div className="w-5/12">
        <img src={PlaceholderImage} />
      </div>
      <div className="w-7/12">
        <p className="text-indigo-600 font-bold">Software Engineer</p>
        <p className="">Orange, Inc.</p>
        <p>
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">Naional Capital Region</span>
        </p>
        <p className="mt-4">Posted 5 days ago</p>
      </div>
    </div >
  )
}

export default JobCard
