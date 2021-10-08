export default function Ad({ info }) {
  const { url } = info;
  return (
    <>
      <img
        className='Ad__image'
        src={url}
        alt='ad'
      />
    </>
  )
}
