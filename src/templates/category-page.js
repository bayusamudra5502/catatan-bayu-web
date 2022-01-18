import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

export default function CategoryPage({ data, location, pageContext }) {
  const posts = data.allMdx.nodes
  const { category } = pageContext

  return (
    <Layout location={location}>
      <Seo title="All posts" />
      <div>
        <Link to="/category">‹ Kembali ke daftar kategori</Link>
      </div>
      <div className="jumbotron">
        <p className="book">
          🏷️
        </p>
        <h1>Kategori {category}</h1>
        <p className="description">
          Ditemukan {posts.length} artikel
        </p>
      </div>

      <ol className="article-list">
        {posts.map(post => {
          const title = post.frontmatter.title || post.slug

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`/${post.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogCategory($category: String) {
    allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 150
      filter: {frontmatter: {category: {in: [$category]}}}
    ) {
      nodes {
        slug
        excerpt
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`