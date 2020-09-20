import React from "react";
import PropTypes from "prop-types";
import TodoCard from "../Todo-card";
import { Row, Container } from "react-bootstrap";

function TodoListing({ tasks, addEditTask, deleteTask, markAscomplete }) {
  let tasksList = tasks.map(task =>
    <TodoCard key={task._id} task={task}
    addEditTask={addEditTask} deleteTask={deleteTask} markAscomplete={markAscomplete} />
  );

  return (
    <Container>
      <Row>{tasksList.length > 0 ? tasksList : ''}</Row>
    </Container>
  );
}

TodoListing.defaultProps = {};
TodoListing.propTypes = {
  tasks: PropTypes.array.isRequired
};
export default TodoListing;
