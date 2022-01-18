import React from 'react'
import { Link } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'
import { FaSearch } from "react-icons/fa"

export default function Header() {
  return (
    <div>
      <header className="global-header">
        <Link to="/">
          <StaticImage src="../images/favicon.png" alt="logo" className="logo" />
          Catatan Bayu
        </Link>
        <div className="sidebar">
          <ul>
            <li className='search'>
              <Link to="/search">
                <FaSearch />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}
