import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataRequest } from "./redux/actions";
import { Container } from "react-bootstrap";
import Job from "./components/Job";
import SearchForm from "./components/SearchForm";
import JobsPagination from "./components/JobsPagination";
import axios from 'axios'

function App() {
  const {loading ,err , jobs, hasNextPage} = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});

  useEffect(() => {
      const cancelToken1 = axios.CancelToken.source();
      const cancelToken2 = axios.CancelToken.source();

      dispatch(fetchDataRequest(params, page, cancelToken1 , cancelToken2));
    
    return () => {
      cancelToken1.cancel()
      cancelToken2.cancel()
    };
  }, [params, page]);

  const handleParamChange = (e) => {
    const param = e.target.name;
    var value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value};
    });
  }

  const handleCheckBoxChange = (e) => {
    e.persist()
    const param = e.target.name;
    // console.log(e.currentTarget.checked)
    console.log(e.target.checked)
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: e.target.checked };
    });
  }

  


  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} handleCheckBoxChange = {handleCheckBoxChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading === true && err === '' && 'Loading....'}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
