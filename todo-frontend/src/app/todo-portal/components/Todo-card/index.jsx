import React, { memo } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import { Badge, Card, Col, ListGroup } from "react-bootstrap";
import { useAuthContext } from '../../../utils/auth.context';

const TodoCard = memo(({ task, addEditTask, deleteTask, markAscomplete }) => {

    const { role } = useAuthContext();
    const {
        _id,
        details,
        isActive,
        childrens,
        updatedAt
    } = task;

    const renderAddSubTask = () => {
        return (<i className="fa fa-plus" aria-hidden="true" onClick={() => addEditTask(null, 'Add sub-task', _id)} />)
    }

    const renderButtons = (task, floatDir) => {
        return (
            task.isActive ? (<div style={{ display: 'inline', float: floatDir }}>
                <i className="fa fa-edit mr-2" onClick={() => addEditTask(task, 'Edit task details')}></i>
                <i className="fa fa-trash mr-2" onClick={() => deleteTask(task)}></i>
                <i className='fa fa-check-circle mr-2' aria-hidden="true" onClick={() => markAscomplete(task)} />
                {floatDir === 'left' ? renderAddSubTask() : ''}
            </div>) : <div style={{ display: 'inline', float: floatDir }}>
                    <Badge variant="secondary">Completed</Badge>
                </div>
        )
    }

    const renderSubTasks = () => {
        return childrens.map(subTask => {
            return (
                <ListGroup.Item key={subTask._id}>
                    {subTask.details}
                    {renderButtons(subTask, 'right')}
                </ListGroup.Item>)
        })
    }

    return (
        <Col md={4}
            className="taskCard"
            key={_id} >
            <Card border={isActive ? 'dark': 'success'}
                style={{ fontSize: '1.02em' }}
                className="mb-2">
                <Card.Body>
                    <Card.Title>
                        <span className="fa fa-tasks" style={{ marginRight: "15px" }}></span>
                        {details}
                    </Card.Title>
                    {renderSubTasks()}
                    <Card.Text>

                    </Card.Text>
                    {role === 'admin' ? renderButtons(task, 'left') : ''}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Last updated At:{' '}
                        <Moment format="hh:mm a" withTitle>
                            {updatedAt}
                        </Moment>
                    </small>
                </Card.Footer>
            </Card>
        </Col >
    )
})

TodoCard.prototype = {
    task: PropTypes.shape({
        _id: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
    })
};
export default TodoCard;
