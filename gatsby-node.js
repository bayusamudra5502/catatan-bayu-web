const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

async function renderAllCategory({ actions, graphql, reporter }) {
  const { createPage } = actions
  const postByCategory = path.resolve("./src/templates/category-page.js")
  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            category
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your all category`,
      result.errors
    )
    return
  }

  const categories = new Set()
  result.data.allMdx.nodes.forEach(({ frontmatter: { category } }) => {
    category?.forEach((el) => {
      categories.add(el)
    })
  })

  categories.forEach((categoryName) => {
    createPage({
      path: `/category/${categoryName}`,
      component: postByCategory,
      context: {
        category: categoryName
      }
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          ${process.env.NODE_ENV !== "development" ?
      "filter: {frontmatter: {draft: {eq: false}}}" : ""}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMdx.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  await renderAllCategory({ actions, graphql, reporter })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      category: [String]
      description: String
      date: Date @dateformat
      icon: String
      subtitle: String
      picture: File
    }

    type Fields {
      slug: String
    }
  `)
}
