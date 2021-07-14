import React from 'react'

const Results = ({ handleClear, resultsFound, exportData }) => {
  return (
    <div className="flex">
      {resultsFound} results found. Would you like to
      {resultsFound > 0 &&
        <span
          onClick={exportData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded ml-1 hover:cursor-pointer">
          Export
        </span>
      }
      <span
        onClick={handleClear}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 rounded ml-1 hover:cursor-pointer">Go Back</span>
    </div>
  )
}

export default Results
