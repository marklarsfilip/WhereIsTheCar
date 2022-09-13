import { useEffect, useState } from 'react';
import readDB from '../api/readDB';
import { ProgressBar } from 'react-loader-spinner'

const History = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    readDB("car-rents").then(result => {
      const filteredData = result.map((item) => item.data);
      setItems(filteredData.sort((a, b) => parseInt(b.dateTime) - parseInt(a.dateTime)));
      setLoading(false);
    })
  }, [])

  const getDateFromTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('sv-SE');
  }

  return (
    <div className="grow flex flex-wrap p-3 flex-col">
      {loading ? (<ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor='#000'
        barColor='#51E5FF'
      />) : (
        <ul className="text-black max-h-screen overflow-y-auto">
          {items.map((document) => {
            return (
              <li className="bg-[#1b1b1b] mt-1 mb-1 p-3 text-white" key={document.dateTime}>
                <span>{document.available ? 'Återlämnad' : 'Lånad'}</span>
                {document.user ? (<span> av {document.user}</span>) : ''}
                <div>
                  {getDateFromTime(document.dateTime)}
                </div>
              </li>
            )
          })}
        </ul>)}
    </div>
  );
}

export default History;
