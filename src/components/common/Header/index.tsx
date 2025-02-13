import { useContext } from 'react'
import Logo from '@/assets/logo.svg'
import { isMobile } from '../../../utils'
import { WalletContext } from "../../../contexts/wallets";

export const Header = () => {
  const { connectedWallet, disconnectWallet } = useContext(WalletContext)

  async function disconnect() {
    disconnectWallet()
  }

  return (
    <div className='w-full p-6 flex justify-between items-center relative z-10'>
    <div onClick={disconnect} className={connectedWallet ? 'cursor-pointer' : ''}>
      <Logo />
    </div>
    {!isMobile() && (
      <div className='flex items-center text-white'>
        <a href='https://neonevm.org' className='hover:text-green' rel='noopener noreferrer' target='_blank'>
          Neon Website
        </a>
        <a href='https://neonpass.live'
           rel='noopener noreferrer'
           target='_blank'
           className='ml-6 text-white hover:text-green'>
          NeonPass
        </a>
        <a href='https://neonevm.org/docs/developing/utilities/faucet'
           rel='noopener noreferrer'
           target='_blank'
           className='ml-6 text-white hover:text-green'>
          Help
        </a>
      </div>
    )}
  </div>
  )
}
