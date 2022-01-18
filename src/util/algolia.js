const blogQuery = `
{
  allMdx(filter: {frontmatter: {draft: {eq: false}}}) {
    nodes {
      frontmatter {
        category
        date
        title
        subtitle
      }
      excerpt(pruneLength: 5000)
      html
      id
    }
  }
}
`

function algoliaTransformer({ data }) {
  return data.allMdx.nodes.map(({
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