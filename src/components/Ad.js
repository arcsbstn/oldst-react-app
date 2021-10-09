import '../styles/Ad.scss'

export default function Ad({ info }) {
  const { url } = info;
  return (
    <div className='Ad__placement'>
      <p>SPONSORED MATERIAL</p>
      <img
        className='Ad__image'
        src={url}
        alt='ad'
      />
    </div>
  )
}
