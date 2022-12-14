/* eslint-disable no-underscore-dangle */
import React from 'react';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import PListItem from './PListItem';
import './PropertyList.css';

function PropertyList() {
  const { data, loading, error } = useFetch('/hotels/propertiesCnt');
  return (
    <div className="pList">
      {loading ? (
        <Loading />
      ) : (
        data.map((each) => (
          <PListItem
            key={each._id}
            imgSrc="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
            accommodationType={each._id}
            numberOfHotels={each.count}
          />
        ))
      )}
    </div>
  );
}

export default PropertyList;
