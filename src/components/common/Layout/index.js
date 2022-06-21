import { Header } from "../Header"
// import Web3Status from "../Web3Status"

const Layout = ({children = null, bodyClassName = '', className = ''}) => {
  return <div className={`layout ${className}`}>
    <Header/>
    <div className={`layout__body ${bodyClassName}`}>
      {children}
    </div>
  </div>
}

export default Layout