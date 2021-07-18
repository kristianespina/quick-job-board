import React from 'react'
import Logo1 from "../assets/logos/1.png"
import Logo2 from "../assets/logos/2.png"
import Logo3 from "../assets/logos/3.png"
import Logo4 from "../assets/logos/4.png"
import Logo5 from "../assets/logos/5.png"
import Logo6 from "../assets/logos/6.png"
import Logo7 from "../assets/logos/7.png"
import Logo8 from "../assets/logos/8.png"
import Logo9 from "../assets/logos/9.png"
import Logo0 from "../assets/logos/0.png"

import { hashCode } from '../utils/helpers'
/**
 *  Creates MockLogo based on string
 */
const MockLogo = ({ company }) => {
  // Creates hashed logo
  const hash = (company && hashCode(company)) || 0
  const hashedLogo = [
    Logo0, Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo9
  ]
  return (
    <div className="flex align-center justify-center">
      <img className="max-h-24" src={hashedLogo[hash]} alt="Logo" />
    </div>
  )
}

export default MockLogo
