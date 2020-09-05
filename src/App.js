import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataRequest } from "./redux/actions";
import { Container } from "react-bootstrap";
import Job from "./components/Job";
import SearchForm from "./components/SearchForm";
import JobsPagination from "./components/JobsPagination";

function App() {
  const jobs = useSelector((state) => state.data.lists);
  const hasNextPage = useSelector((state) => state.data.hasNextPage);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const timeRef = useRef();

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      dispatch(fetchDataRequest(params, page));
    }, 1500);
    dispatch(fetchDataRequest(params, page));
    return () => {
      clearTimeout(timeRef.current);
    };
  }, [params, page]);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {jobs.length === 0 && 'Loading....'}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
