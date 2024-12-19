import { ReactComponent as Logo } from '@/assets/logo.svg'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from '../../../config'

export const Header = () => {
  const { connector, isActive } = useWeb3React()

  async function disconnect() {
    try {
      connector.deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className='w-full p-6 flex justify-between items-center relative z-10'>
      <div onClick={disconnect} className={isActive ? 'cursor-pointer' : null}>
        <Logo />
      </div>
      {!isMobile() && (
        <div className='flex items-center text-white'>
          <a
            href='https://neonevm.org'
            className='hover:text-green'
            rel='noopener noreferrer'
            target='_blank'
          >
            Neon Website
          </a>
          <a
            href='https://neonpass.live'
            rel='noopener noreferrer'
            target='_blank'
            className='ml-6 text-white hover:text-green'
          >
            NeonPass
          </a>
          <a
            href='https://docs.neonevm.org/docs/developing/utilities/faucet'
            rel='noopener noreferrer'
            target='_blank'
            className='ml-6 text-white hover:text-green'
          >
            Help
          </a>
        </div>
      )}
    </div>
  )
}
