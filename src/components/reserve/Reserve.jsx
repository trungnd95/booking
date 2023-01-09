/* eslint-disable no-underscore-dangle */
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './Reserve.css';

function Reserve({ setOpen, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/${hotelId}/rooms`);
  const {
    searchState: { dates },
  } = useSearchContext();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const datesNum = [];
    while (date <= end) {
      datesNum.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return datesNum;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) =>
    !roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()));

  const handleSelect = (e) => {
    const { checked, value } = e.target;
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value),
    );
  };

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/hotels/${hotelId}/rooms/${roomId}/availability`, {
            dates: allDates,
          });
          return res.data;
        }),
      );
      setOpen(false);
      navigate('/');
    } catch (err) {
      /* empty */
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

Reserve.propTypes = {
  setOpen: PropTypes.func,
  hotelId: PropTypes.string,
};

Reserve.defaultProps = {
  setOpen: () => {},
  hotelId: null,
};

export default Reserve;
