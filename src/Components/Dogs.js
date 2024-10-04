import axios from 'axios';
import React, { useEffect, useState } from 'react'

import './Cats.css'
const Dogs = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        axios.get('https://api.thedogapi.com/v1/images/search?order=ASC&has_breeds=1&limit=100',{
            headers: {
                'x-api-key':'live_drtJqWkp11RavQuE6faaEytwzzKXFYsO6jGcV4Xd0fgTXhdKyJVFf6P5QxTtYXFl'
            },
        })
        .then(res => setDogs(res.data))
        .then(console.log(dogs))
        .catch(err => console.error(err));
    })
  return (
    <div className="cats-container">
      <h1>List of Dog Breeds</h1>
      <ul className="cats-list">
        {dogs.map((cat, index) => (
          <li key={index} className="cat-item">
            <div>
            <img src={cat.url} alt="" />
            </div>
            {cat.breeds[0].name}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Dogs