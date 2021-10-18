import * as React from "react"
import Twemoji from "react-twemoji"
import Header from "./Header"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <Twemoji>
      <div className="header-wrapper" data-is-root-path={isRootPath}>
        <Header />
      </div>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          Dibuat dengan <span style={{ margin: "3px" }}>❤️</span> oleh Bayu
          Samudra, {new Date().getFullYear()}
        </footer>
      </div>
    </Twemoji>
  )
}

export default Layout
