import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Twemoji from "react-twemoji"
import Header from "./Header"

const Layout = ({ children, img }) => {
  const image = !!img && getImage(img);

  return (
    <Twemoji>
      <div className="global-wrapper">
        <Header />
      </div>
      {
        !!image && (
          <div className="picture">
            <GatsbyImage image={image} alt="Banner Picture" />
          </div>
        )
      }
      <div className="global-wrapper">
        <main>{children}</main>
        <footer>
          Dibuat dengan <span style={{ margin: "3px" }}>❤️</span> oleh Bayu Samudra, {new Date().getFullYear()}
        </footer>
      </div>
    </Twemoji >
  )
}

export default Layout
