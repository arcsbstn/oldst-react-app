import '../styles/Ad.scss'

export default function Ad({ info }) {
  const { url, adImageId } = info;
  return (
    <div className='Ad__placement'>
      <p>SPONSORED MATERIAL {adImageId}</p>
      <img
        className='Ad__image'
        src={url}
        alt='ad'
      />
    </div>
  )
}
