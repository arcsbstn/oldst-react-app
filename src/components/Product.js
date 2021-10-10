import moment from 'moment'

import '../styles/Product.scss'

export default function Product({ info }) {
  const { size, price, face, date } = info;

  const priceInDollars = (Math.round(price) / 100).toFixed(2);
  const today = moment();
  const oneWeekFromToday = today.clone().subtract(7, 'days').startOf('day');
  const isWithinAWeek = moment(date).isAfter(oneWeekFromToday);
  const relativeDate = moment(date.substr(3, 12)).fromNow()
  const fullDate = date.substr(3, 12)

  return (
    <>
      <span className='Product__face' style={{ fontSize: `${size}px` }}>{face}</span>
      <div className='Product__displayInfo'>
        <p className='Product__price'>${priceInDollars}</p>
        <p>Size: {size}px</p>
        <p>Posted {isWithinAWeek ? relativeDate : fullDate}</p>
      </div>
    </>
  )
}
