import {ReactComponent as Logo} from '@/assets/logo.svg'

export const Header = () => {
  return <div className="w-full p-6 flex justify-between items-center relative z-10">
    <div>
      <Logo/>
    </div>
    <div className='flex items-center text-white'>
      <a href='https://neon-labs.org' rel='noopener noreferrer'
        target='_blank'>Neon Website</a>
      <a href='https://neonpass.live' rel='noopener noreferrer'
        target='_blank' className='ml-6'>NeonPass</a>
      <a href='https://github.com/neonlabsorg/neon-support/issues' rel='noopener noreferrer'
        target='_blank' className='ml-6'>Help</a>
    </div>
  </div>
}