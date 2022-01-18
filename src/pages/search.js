import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Link } from 'gatsby';
import { FaSearch } from 'react-icons/fa';

const searchClient = algoliasearch('EB2YAF4JY4', 'eb592bebcfe6b274b5acc4641ae86f71');

function InfiniteSearchResult({ hits, hasMore, refineNext }) {
  return (
    <div>
      <ol className='article-list'>
        {hits.map(({ title, excerpt, slug, description, date }) => (
          <li>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2>
                  <Link to={`/${slug}`} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small>{new Intl.DateTimeFormat("id", { dateStyle: "long" }).format(new Date(date))}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description || excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          </li>
        ))}
      </ol>
      <button onClick={refineNext} className={hasMore ? "show more-button" : "hide more-button"}>
        Tampilkan lainnya
      </button>
    </div>
  )
}

function SearchBar({ currentRefinement, isSearchStalled, refine }) {
  const [query, setQuery] = useState(currentRefinement);

  useEffect(() => {
    refine(query)
  }, [query]);

  return (
    <div className='search-component'>
      <div className='search-bar'>
        <input type="search"
          value={query}
          onChange={event => setQuery(event.currentTarget.value)}
          placeholder='Tulis kata kunci'
        />
        <button title="Cari">
          <FaSearch />
        </button>
      </div>
      <p className={isSearchStalled ? 'error' : 'hide'}>Terjadi kesalahan saat mengambil data</p>
    </div>
  )
}

export default function SearchPage() {
  const Result = connectHits(InfiniteSearchResult);
  const SearchBox = connectSearchBox(SearchBar);

  return (
    <Layout location="/search">
      <Seo title="All posts" />
      <article className='search-page'>
        <div className='search-icon'>
          🔍
        </div>
        <h1 >Pencarian</h1>

        <InstantSearch searchClient={searchClient} indexName="bayu_note">
          <SearchBox />
          <Result />
        </InstantSearch>
      </article>
    </Layout>
  )
}
