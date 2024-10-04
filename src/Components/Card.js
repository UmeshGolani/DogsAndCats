import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Card = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/images/search?order=ASC&has_breeds=1&limit=1',{
      headers: {
        'x-api-key': 'live_SYBLZU6Su76X4FW9YhcOn1frJ3XqPiBIvdwSrr1iyceT7vvq3VHdBVS9UkcrAOsJ',
      },
    })
    .then(res => setData([...res.data]))
    .then(console.log(data))
    .catch(err => console.log(err));
  })
  return (
    <div>
      {data.map((item, i) => (
        <li key={i}>
          <img src={item.url} alt="" />
          {item.breeds[0].name}
          </li>
      ))}
    </div>
  )
}

export default Card