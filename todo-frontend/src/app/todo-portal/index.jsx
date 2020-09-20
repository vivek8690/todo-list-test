import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import _ from "lodash";
import toast from 'toasted-notes';
import { TodoListing, SearchComponent } from "./components";
import { getTasks, deleteTaskDetails, updateTaskDetails, addTaskDetails } from "../utils/task.api";
import TodoModalComponent from './components/Todo-modal';

function TodoPortal() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState({});
  const [openTask, displayTask] = useState(false);
  const [task, currentTask] = useState({});
  const [action, setAction] = useState('Add');


  const openTaskModal = () => {
    return <TodoModalComponent show={openTask}
      onHide={closeModal} action={action}
      taskObj={task} actioncallback={actioncallback} />
  }

  const closeModal = () => {
    currentTask({});
    displayTask(false);
  }

  const fetchTasks = async (query) => {
    try {
      const tasks = await getTasks(query);
      setTasks(tasks.data.data);
    } catch (err) {
      toast.notify(`${err.response.statusText}`, {
        position: 'top',
      });
    }
  }

  const addEditTask = (task, action, parentId) => {
    setAction(action);
    displayTask(true);
    currentTask({ ...task, parentId });
  }

  const markAscomplete = async(task) => {
    task.isActive = false;
    try {
        const resp = await updateTaskDetails(task);
        toast.notify(`${resp.data.message}`, {
          position: 'top',
        });
    }catch(err){
      toast.notify(`${err.response.statusText}`, {
        position: 'top',
      });
    }
    fetchTasks(query);
  }

  const actioncallback = async (action, task) => {
    let resp;
    try {
      if (action.includes('Edit')) {
        resp = await updateTaskDetails(task);
      } else {
        resp = await addTaskDetails(task);
      }
      toast.notify(`${resp.data.message}`, {
        position: 'top',
      });
      displayTask(false);
      currentTask({});
    } catch (err) {
      toast.notify(`${err.response.statusText}`, {
        position: 'top',
      });
    }
    fetchTasks(query);
  }

  const deleteTask = async (task) => {
    try {
      const resp = await deleteTaskDetails(task._id);
      toast.notify(`${resp.data.message}`, {
        position: 'top',
      });
      fetchTasks(query);
    } catch (err) {
      toast.notify(`${err.response.statusText}`, {
        position: 'top',
      });
    }
  }

  const debounceSearch = useRef(
    _.debounce(query => {
      fetchTasks(query);
      setQuery(query);
    }, 1000)
  );

  const onHandleChange = (query) => {
    debounceSearch.current(query);
  }

  return (
    <Container>
      <SearchComponent onHandleChange={onHandleChange}
        addEditTask={addEditTask} />
      <hr />
      {tasks ? <TodoListing tasks={tasks} deleteTask={deleteTask}
        addEditTask={addEditTask}  markAscomplete={markAscomplete} /> : ''}
      {openTaskModal()}
    </Container>
  )
}

export default TodoPortal;