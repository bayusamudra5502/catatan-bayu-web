const blogQuery = `
{
  allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}}}) {
    nodes {
      frontmatter {
        category
        date
        title
        subtitle
        description
      }
      fields{
        slug
      }
      content: excerpt(pruneLength: 5000)
      excerpt
      id
    }
  }
}
`

function algoliaTransformer({ data }) {
  return data.allMarkdownRemark.nodes.map(({
    id, frontmatter, ...others
  }) => ({
    objectID: id,
    ...frontmatter,
    ...others,
  }))
}

const queries = [
  {
    query: blogQuery,
    transformer: algoliaTransformer
  }
]

module.exports = queries;