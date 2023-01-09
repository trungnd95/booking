import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Contact, Footer, Header, Navbar } from '../../components';
import Loading from '../../components/loading/Loading';
import Reserve from '../../components/reserve/Reserve';
import { useAuthContext } from '../../context/AuthContext';
import { useSearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './Hotel.css';

function dayDifference(date1, date2) {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}

function Hotel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideOpen, setSlideOpen] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState(false);

  const handleSwipe = (direction, maxLength) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = activeSlideIndex === 0 ? maxLength : activeSlideIndex - 1;
    } else {
      newSlideNumber = activeSlideIndex === maxLength ? 0 : activeSlideIndex + 1;
    }

    setActiveSlideIndex(newSlideNumber);
  };

  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];
  const { data, loading } = useFetch(`/hotels/${hotelId}`);

  const { dates, options } = useSearchContext().searchState;
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const {
    authState: { user },
  } = useAuthContext();
  const navigate = useNavigate();
  const handleReserveClick = (e) => {
    e.preventDefault();
    if (user) {
      setOpenReserveModal(true);
    } else {
      navigate('/login');
    }
  };
  return (
    <div>
      <Navbar />
      <Header page="list" />
      {loading ? (
        <Loading />
      ) : (
        <div className="hotelContainer">
          {slideOpen && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setSlideOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleSwipe('l', data.photos.length)}
              />
              <div className="sliderWrapper">
                <img src={data.photos[activeSlideIndex].src} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleSwipe('r', data.photos.length)}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button type="button" className="bookNow" onClick={handleReserveClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">Excellent location – {data.distance}m from center</span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={photo}>
                  <img
                    onClick={() => {
                      setSlideOpen((prev) => !prev);
                      setActiveSlideIndex(i);
                    }}
                    src={photo}
                    alt=""
                    className="hotelImg"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an excellent location score
                  of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button type="button" onClick={handleReserveClick}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <Contact />
          <Footer />
        </div>
      )}
      {openReserveModal && <Reserve setOpen={setOpenReserveModal} hotelId={hotelId} />}
    </div>
  );
}

export default Hotel;
