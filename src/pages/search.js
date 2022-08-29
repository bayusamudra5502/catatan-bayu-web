import React, { useState } from 'react'
import Layout from '../components/layout';
import Seo from '../components/seo';
import { FaSearch } from 'react-icons/fa';


function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className='search-component'>
      <div className='search-bar'>
        <input type="search"
          value={query}
          onChange={event => setQuery(event.currentTarget.value)}
          placeholder='Tulis kata kunci'
          disabled
        />
        <button title="Cari">
          <FaSearch />
        </button>
      </div>
      <p>Pencarian sedang dinonaktifkan</p>
    </div>
  )
}

export default function SearchPage() {

  return (
    <Layout location="/search">
      <Seo title="All posts" />
      <article className='search-page'>
        <div className='search-icon'>
          🔍
        </div>
        <h1 >Pencarian</h1>

        <SearchBar />
      </article>
    </Layout>
  )
}
