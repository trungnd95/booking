import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBed, faCar, faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ page = 'home' }) {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleCounter = (name, op) => {
    setOptions((prev) => ({
      ...prev,
      [name]: op === 'i' ? options[name] + 1 : options[name] - 1,
    }));
  };

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/hotels', { state: { destination, dateRange, options } });
  };

  return (
    <div className="header">
      <div className={page === 'list' ? 'headerContainer headerListPage' : 'headerContainer'}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span className="headerListItemLabel">Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span className="headerListItemLabel">Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span className="headerListItemLabel">Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span className="headerListItemLabel">Airport Taxis</span>
          </div>
        </div>
        {page === 'home' && (
          <>
            <h1 className="headerTitle">{`A lifetime of discounts? It's Genius.`}</h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or more with a free
              BookingApp account
            </p>
            <button type="button" className="headerBtn">
              Sign in / Register
            </button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                t
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerSearchIcon" />
                <span
                  aria-hidden="true"
                  className="headerSearchText"
                  onClick={() => {
                    setOpenDate((prev) => !prev);
                  }}
                >{`${format(dateRange[0].startDate, 'dd/MM/yyyy')} to ${format(
                  dateRange[0].endDate,
                  'dd/MM/yyyy',
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    className="dateRangePicker"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                <span
                  aria-hidden="true"
                  className="headerSearchText"
                  onClick={() => setOpenOptions((prev) => !prev)}
                >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          type="button"
                          className="optionCounterButton"
                          onClick={() => handleCounter('adult', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button
                          type="button"
                          className="optionCounterButton"
                          onClick={() => handleCounter('adult', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          type="button"
                          className="optionCounterButton"
                          onClick={() => handleCounter('children', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button
                          type="button"
                          className="optionCounterButton"
                          onClick={() => handleCounter('children', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          type="button"
                          className="optionCounterButton"
                          onClick={() => handleCounter('room', 'd')}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button
                          type="button"
                          className="optionCounterButton"
                          onClick={() => handleCounter('room', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button type="button" className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
Header.propTypes = {
  page: PropTypes.string,
};

Header.defaultProps = {
  page: 'home',
};
export default Header;
