import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ArticleData from "../components/ArticleData"
import Breadcrumb from "../components/Breadcrumb"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const picture = post.frontmatter.picture
  const category = post.frontmatter?.category ?? []

  return (
    <Layout location={location} title={siteTitle} img={picture}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        lang="id"
        image={picture}
      />
      <main
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Breadcrumb slug={post.fields.slug} />
        <header>
          {
            post.frontmatter?.icon ? (
              <div className="article-icon">
                {post.frontmatter.icon}
              </div>
            ) : null
          }
          <h1 className="title" itemProp="headline">{post.frontmatter.title}</h1>
          <p className="subtitle">{post.frontmatter.subtitle}</p>
          <ArticleData date={post.frontmatter.date} wordCount={10} />
        </header>
        <article dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody" />
        <div className="category">
          {category.length > 0 ? <h2>Kategori Artikel</h2> : null}
          <ul>
            {category.map((el) => {
              return <li key={el}>
                <Link to={`/category/${el}`}>
                  {el}
                </Link>
              </li>
            })}
          </ul>
        </div>

        <footer>
          <h2 className="author">
            Tentang Penulis
          </h2>
          <Bio />
        </footer>
      </main>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/" + previous.fields.slug} rel="prev">
                ‹ {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/" + next.fields.slug} rel="next">
                {next.frontmatter.title} ›
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query (
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        category
        title
        date(formatString: "DD MMMM YYYY")
        description
        icon
        subtitle
        picture {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
           )
          }
        }
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(frontmatter: {draft: {eq: false}}, id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(frontmatter: {draft: {eq: false}}, id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
