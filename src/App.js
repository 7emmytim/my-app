import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [axiosData, setAxiosData] = useState(null)
  const [error, setError] = useState('')
  const [searchField, setSearchField] = useState('')
  const [groupFilter, setGroupFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')

  useEffect(() => {
    axios.get('https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter')
      .then(res => {
        setAxiosData(res.data)
        setError('')
      })
      .catch(error => {
        if (error.response) {
          console.log(error)
          axiosData ? setError('') : setError('Error from server please check back later')
        } else if (error.request) {
          axiosData ? setError('') : setError('Please check your network connection')
        } else {
          axiosData ? setError('') : setError('Please try again later')
        }
      })
  }, [axiosData])

  return (
    <div className="App container">
      <div className="App-header">
      {error && <div className="alert alert-danger p-0 py-1" role="alert">{error}</div>}
        <h2 className='text-secondary my-3'>9ijakids Game List</h2>
        <input type='text' className='form-control my-3' placeholder='Search by Topic' value={searchField} onChange={(e) => setSearchField(e.target.value)} />
        <select className="form-select form-select-sm" value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
          <option value='' disabled>Filter by Group</option>
          <option value=''>All Groups</option>
          {axiosData && Array.from(new Set(axiosData.map(a => a.Group))).map((data, index) => <option value={data} key={index}>{data}</option>)}
        </select>
        <select className="form-select form-select-sm" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value='' disabled>Filter by Level</option>
          <option value=''>All Levels</option>
          {axiosData && Array.from(new Set(axiosData.map(a => a.Level))).map((data, index) => <option value={data} key={index}>{data}</option>)}
        </select>
        <div className='row mt-3'>
          {
            axiosData === null ?
              <div className='text-center mt-4'>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className='text-secondary'>Loading...</p>
              </div>
              : axiosData
                .filter(data => data.Topic.toLowerCase().includes(searchField.toLowerCase()))
                .filter(data => groupFilter ? data.Group === groupFilter : data)
                .filter(data => levelFilter ? data.Level === levelFilter : data)
                .map((data, index) => {
                  return (
                    <div className='col-lg-3 col-md-4 col-sm-6 my-2' key={index}>
                      <div className="card h-100">
                        <img src={data.GameImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h6 className="card-title">{data.Topic}</h6>
                          <p className="card-text lead">{data.GameDescription}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
          }
        </div>
      </div>
    </div>
  );
}

export default App;

