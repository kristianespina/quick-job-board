import React, { useState } from 'react'
import "./style.css"

import PersonWorking from '../../components/PersonWorking'
import TextInput from '../../components/TextInput'

const Home = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="h-screen pt-24 homepage">

      <div className="w-full mb-24 z-1">
        <div className="flex justify-center">
          <div className="w-2/12"></div>
          <div className="w-3/12"><PersonWorking /></div>
          <div className="w-4/12 flex flex-col pl-36">
            <div className="text-5xl text-indigo-600 pt-24 mb-4 font-bold">Looking for work?</div>
            <form className="flex flex-row gap-4">
              <div className="w-96">
                <TextInput placeholder="Search for job title, or position" state={search} setValue={setSearch} />
              </div>
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="w-3/12"></div>
        </div>
      </div>

      <div className="w-full pt-36">
        <div className="flex justify-center">
          <div className="w-2/12"></div>
          <div className="w-8/12">
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-white text-center">Subscribe in our mailing list</div>
              <div className="flex flex-row gap-4 content-center justify-center mt-4">
                <div className="w-96">
                  <TextInput placeholder="Enter your email address" state={search} setValue={setSearch} autofocus />
                </div>
                <div>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/12"></div>
        </div>
      </div>

    </div>
  )
}

export default Home
