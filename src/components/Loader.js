import '../styles/Loader.scss';

export default function Loader() {
  return (
    <div className='Loader__wrapper'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
