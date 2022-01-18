import { Link } from 'gatsby';
import React from 'react'

export default function Breadcrumb({ slug }) {
  let temp = "";
  const links = slug.slice(0, -1).split('/').map((token) => {
    temp += `/${token}`;
    return { url: temp, token };
  });

  return (
    <nav>
      <ul className='breadcrumb'>
        <li><Link to='/'>Home</Link></li>
        {
          links.map(({ url, token }, idx) => {
            if (idx === links.length - 1) {
              return <li>{token}</li>
            }

            return <li>
              <Link to={url}>{token}</Link>
            </li>
          })
        }
      </ul>
    </nav>
  )
}
