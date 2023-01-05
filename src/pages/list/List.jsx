/* eslint-disable no-underscore-dangle */
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import { Header, Navbar, SearchItem } from '../../components';
import Loading from '../../components/loading/Loading';
import { useSearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './List.css';

function List() {
  const location = useLocation();
  const [searchState, setSearchState] = useState({
    destination: location.state.destination,
    dateRange: location.state.dateRange,
    options: location.state.options,
    minPrice: 10,
    maxPrice: 500,
  });
  const [openDate, setOpenDate] = useState(false);

  const { data, loading } = useFetch(
    `/hotels?${searchState.destination ? `city=${searchState.destination}` : ''}&min=${
      searchState.minPrice
    }&max=${searchState.maxPrice}`,
  );

  const handleInputChange = (e) => {
    setSearchState((prev) =>
      e.target.name.includes('options')
        ? {
            ...prev,
            options: {
              ...prev.options,
              [e.target.name.split('.')[1]]: Number(e.target.value),
            },
          }
        : {
            ...prev,
            [e.target.name]: e.target.value,
          },
    );
  };

  const { dispatch } = useSearchContext();
  useEffect(() => {
    dispatch({
      type: 'NEW_SEARCH',
      payload: {
        city: searchState.destination,
        dates: searchState.dateRange,
        options: searchState.options,
      },
    });
  }, [dispatch, searchState]);

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
                name="destination"
                value={searchState.destination}
                placeholder="Where do you want to go?"
                onChange={handleInputChange}
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
                    setSearchState((prev) => ({
                      ...prev,
                      dateRange: [item.selection],
                    }))
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
                    value={searchState.minPrice}
                    onChange={handleInputChange}
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
                    value={searchState.maxPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    id="adultOption"
                    name="options.adult"
                    className="lsOptionItemInput"
                    min={1}
                    placeholder={1}
                    value={searchState.options.adult}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    id="childrenOption"
                    name="options.children"
                    className="lsOptionItemInput"
                    min={0}
                    placeholder={0}
                    value={searchState.options.children}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    id="roomOption"
                    name="options.room"
                    className="lsOptionItemInput"
                    min={1}
                    placeholder={1}
                    value={searchState.options.room}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button type="button">Search</button>
          </div>
          <div className="listResult">
            {loading ? <Loading /> : data.map((item) => <SearchItem key={item._id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
