import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

export default function CategoryPage({ data, location }) {
  const categoriesSet = new Set()

  data.allMdx.nodes.forEach(({ frontmatter: { category } }) => {
    category?.forEach((el) => {
      categoriesSet.add(el)
    })
  })

  const categories = [...categoriesSet]

  return (
    <Layout location={location}>
      <Seo title="All posts" />

      <div className="jumbotron">
        <p className="book">
          🏷️
        </p>
        <h1>Daftar Kategori</h1>
        <p className="description">
          Berikut ini adalah daftar kategori kami
        </p>
      </div>

      <ol className='categories'>
        {categories.map(category => {
          return (
            <li key={category}>
              <Link to={`/category/${category}`} >
                {category}
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}


export const pageQuery = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          category
        }
      }
    }
  }
`