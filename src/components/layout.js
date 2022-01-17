import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Header from "./Header"
import twemoji from "twemoji"

const Layout = ({ children, img }) => {
  const layoutRef = React.useRef();
  const image = !!img && getImage(img);

  React.useEffect(() => {
    layoutRef.current && twemoji.parse(layoutRef.current);
  }, [layoutRef]);


  return (
    <div ref={layoutRef}>
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
    </div>
  )
}

export default Layout
