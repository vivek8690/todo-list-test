import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'

const TaskCreateEdit = ({ show, onHide, action, taskObj, actioncallback }) => {

    const [task, setTask] = useState({
        details: '',
        isActive: true,
        parentId: null
    })

    useEffect(() => {
        if (taskObj) {
            setTask(taskObj);
        }
    }, [taskObj]);

    const handleSubmit = (event) => {
        event.preventDefault();
        actioncallback(action, task);
    }

    return (
        <Modal size="md" show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{action}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Task
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text"
                                placeholder="Enter What needs to be done?"
                                value={task.details || ''}
                                onChange={(evt) => setTask({ ...task, details: evt.target.value })}
                                required />
                        </Col>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>)
}

export default TaskCreateEdit;