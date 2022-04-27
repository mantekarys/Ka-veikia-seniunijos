import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendar, faClock, faMoneyBill } from '@fortawesome/free-solid-svg-icons'


export default function EventPost({event}) {
  return (
    <>
        <h3 className='header__tertiary'>Renginys</h3>
        <p className='post__header-event'><b>{event.name}</b></p>
        <p>{event.desciption}</p>
        <div className='post__content-event'>
            <div className='post__content-event--left'>
                <p>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className='post__content-event--description'><b> Vieta: </b>{event.address}</span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faCalendar} />
                    <span className='post__content-event--description'><b>Data: </b>{event.date.slice(0, 10)}</span>
                </p>
            </div>
            <div className='post__content-event--right'>
                <div className='post__content-event--times'>
                    <p>
                        <FontAwesomeIcon icon={faClock} />
                        <span className='post__content-event--description'><b>Pradžia: </b>{event.startTime.slice(0, 5)}</span>
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faClock} />
                        <span className='post__content-event--description'><b>Pabaiga: </b>{event.endTime.slice(0, 5)}</span>
                    </p>
                </div>

                <p>
                    <FontAwesomeIcon icon={faMoneyBill} />
                    <span className='post__content-event--description'><b>Kaina: </b>{event.price === 0 ? 'Nemokamas' : event.price}</span>
                </p>
            </div>
        </div>
    </>
  )
}


