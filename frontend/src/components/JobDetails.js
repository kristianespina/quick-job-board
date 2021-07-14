import React, { useEffect, useState } from 'react'
import moment from "moment";
import { apiRequest } from '../utils/api'

import NotFound from "./NotFound"
import ApplicantsTable from "./ApplicantsTable"

const JobDetails = ({ data }) => {
  const [users, setUsers] = useState([])

  /**
   * Creates an API request on /users/search
   * 
   * @param {Object} payload 
   */
  const fetchUsers = async (payload) => {
    const options = {
      method: "POST",
      endpoint: "/users/search",
      payload: payload
    }
    const response = await apiRequest(options);

    // Update list
    if (response && response.status === 200) {
      setUsers(response.data)
    }
  }
  useEffect(() => {
    if (data && data.applicants && data.applicants.length) {
      fetchUsers({
        users: data.applicants
      })
    }
  }, [data])
  return (
    <>
      {data && data.company ?
        <div>
          <p className="text-4xl text-indigo-600 font-bold">{data && data.position}</p>
          <p className="">{data && data.company}</p>
          <p className="">{data && data.location}</p>
          <p className="mt-4 mb-4">{data && data.created_at && moment(data.created_at).fromNow()}</p>
          <p className="mt-4">
            {data && data.description}
          </p>

          {users.length > 0 && <ApplicantsTable users={users} />}
        </div>
        :
        <NotFound />
      }
    </>
  )
}

export default JobDetails
