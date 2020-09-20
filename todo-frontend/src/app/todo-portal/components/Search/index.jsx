import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import SearchBar from "./searchBar";
import { useAuthContext } from '../../../utils/auth.context';


const options = [
  { value: 'All', label: 'all' },
  { value: 'Active', label: 'active' },
  { value: 'Completed', label: 'completed' },
];

function SearchArea({ onHandleChange, addEditTask }) {

  const { role } = useAuthContext();
  const [query, setQuery] = useState({
    search: '',
    sortBy: options[0],
    genre: []
  })

  useEffect(() => {
    onHandleChange(query)
  }, [query])

  return (
    <Container className="search-area">
      <Row>
        <Col md={3}>
          <SearchBar
            placeholder="Search task"
            name="search"
            type="text"
            onChange={(evt) => setQuery({ ...query, search: evt.target.value })}
          />
        </Col>
        {role === 'admin' ? <Col>
          <Button className="btn btn-secondary"
            onClick={() => addEditTask(null,'Add task')}>Add Task</Button>
        </Col> : ''}
      </Row>
    </Container>
  );
}

SearchArea.propTypes = {
  onHandleChange: PropTypes.func.isRequired
};
export default SearchArea;
