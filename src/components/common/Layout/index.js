import Web3Status from "../Web3Status"

const Layout = ({children = null, bodyClassName = '', className = ''}) => {
  return <div className={`layout ${className}`}>
    <div className="w-full flex justify-between px-8 py-6 z-10 relative">
      <div className="w-1/6"></div>
      <div className="w-1/6">
        <Web3Status/>
      </div>
    </div>
    <div className={`layout__body ${bodyClassName}`}>
      {children}
    </div>
  </div>
}

export default Layout