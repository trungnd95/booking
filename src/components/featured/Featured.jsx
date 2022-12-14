/* eslint-disable no-underscore-dangle */
import React from 'react';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import './Featured.css';
import FeaturedItem from './FeaturedItem';

function Featured() {
  const { data, loading, error } = useFetch('/hotels/featuredCity');
  return (
    <div className="featured">
      {loading ? (
        <Loading />
      ) : (
        data?.map((each) => (
          <FeaturedItem
            key={each._id}
            imgSrc="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            name={each._id}
            count={each.count}
          />
        ))
      )}
    </div>
  );
}

export default Featured;
