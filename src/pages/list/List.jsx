import { format } from 'date-fns';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import { Header, Navbar, SearchItem } from '../../components';
import './List.css';

function List() {
  const location = useLocation();
  const [searchState, setSearchState] = useState(location.state);
  const [openDate, setOpenDate] = useState(false);
  return (
    <div>
      <Navbar />
      <Header page="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="lsTitle">Search</div>
            <div className="lsItem">
              <label htmlFor="desc">Destination</label>
              <input
                id="desc"
                type="text"
                name="desc"
                value={searchState.destination}
                placeholder="Where do you want to go?"
              />
            </div>
            <div className="lsItem">
              <label htmlFor="date">Check-in Date</label>
              <span
                aria-hidden="true"
                className="dateRangeSearchText"
                onClick={() => {
                  setOpenDate((prev) => !prev);
                }}
              >{`${format(searchState.dateRange[0].startDate, 'dd/MM/yyyy')} to ${format(
                searchState.dateRange[0].endDate,
                'dd/MM/yyyy',
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs
                  onChange={(item) =>
                    setSearchState((prev) => ({ ...prev, destination: [item.selection] }))
                  }
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                  ranges={searchState.dateRange}
                  className="dateRangePicker"
                />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="options">Options </label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small> per night</small>
                  </span>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    className="lsOptionItemInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    className="lsOptionItemInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    id="adultOption"
                    name="adultOption"
                    className="lsOptionItemInput"
                    min={1}
                    placeholder={1}
                    value={searchState.options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    id="childrenOption"
                    name="childrenOption"
                    className="lsOptionItemInput"
                    min={0}
                    placeholder={0}
                    value={searchState.options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    id="roomOption"
                    name="roomOption"
                    className="lsOptionItemInput"
                    min={1}
                    placeholder={1}
                    value={searchState.options.room}
                  />
                </div>
              </div>
            </div>
            <button type="button">Search</button>
          </div>
          <div className="listResult">
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
