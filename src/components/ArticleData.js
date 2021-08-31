import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

export default function ArticleData({ date, wordCount }) {
  const data = useStaticQuery(graphql`
    query ArticleBioQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="article-data">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-picture.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <div>
        <p className="author">{author.name}</p>
        <p>{new Intl.DateTimeFormat("id", { dateStyle: "long" }).format(new Date(date))} • {Math.ceil(wordCount / 200)} menit</p>
      </div>
    </div>
  )
}
