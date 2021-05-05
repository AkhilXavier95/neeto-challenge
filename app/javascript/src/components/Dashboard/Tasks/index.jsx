import React, { useEffect, useState } from "react";

import { Button, Toastr, PageLoader } from "neetoui";
import { PageHeading, SubHeader } from "neetoui/layouts";

import EmptyState from "components/Common/EmptyState";
import EmptyTaskList from "images/EmptyTaskList";

import ListTasks from "./ListTasks";
import DeleteModal from "./DeleteModal";
import CreateNewTask from "./CreateNewTask";
import UserDropDown from "./UserDropDown";

const initialTasks = [
  {
    id: 1,
    title: "task1",
    description: "task1 description",
    tag: "Internal",
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    id: 2,
    title: "task2",
    description: "task2 description",
    tag: "Bug",
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    id: 3,
    title: "task3",
    description: "task3 description",
    tag: "workflow",
    createdDate: new Date(),
  },
  {
    id: 4,
    title: "task4",
    description: "task3 description",
    tag: "Internal",
    createdDate: new Date(),
    dueDate: new Date(),
  },
];

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState(initialTasks);
  const [selectedIds, setSelectedIds] = useState([]);
  const [singleTaskId, setSingleTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewTaskPane, setShowNewTaskPane] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const onSelectAll = () => {
    const taskIds = taskList.map(task => task.id);
    const selected = taskIds.length === selectedIds.length ? [] : taskIds;
    setSelectedIds(selected);
  };

  const onSelectTask = (event, taskId) => {
    event.stopPropagation();
    const index = selectedIds.indexOf(taskId);
    if (index > -1) {
      setSelectedIds([
        ...selectedIds.slice(0, index),
        ...selectedIds.slice(index + 1),
      ]);
    } else {
      setSelectedIds([...selectedIds, taskId]);
    }
  };

  const handleDelete = () => {
    const cTaskList = [...taskList];
    const deleteTasks = singleTaskId || selectedIds;
    deleteTasks.forEach(taskId => {
      const index = cTaskList.map(task => task.id).indexOf(taskId);
      cTaskList.splice(index, 1);
    });
    setTaskList(cTaskList);
    setSelectedIds([]);
    onClose();
    Toastr.success("The task was deleted successfully.");
  };

  const onClose = () => {
    setShowDeleteModal(false);
    setSingleTaskId(null);
  };

  const editClickAction = () => {};
  const deleteClickAction = id => {
    setShowDeleteModal(true);
    setSingleTaskId([id]);
  };

  const createNewTask = values => {
    const { title, description, dueDate, showDueDate, tags } = values;
    const cTaskList = [...taskList];
    const newTask = {
      id: taskList.length + 1,
      title,
      description,
      tag: tags.value,
      createdDate: new Date(),
    };
    if (showDueDate) {
      newTask.dueDate = new Date(dueDate);
    }
    cTaskList.push(newTask);
    setTaskList(cTaskList);
    setShowNewTaskPane(false);
    Toastr.success("The task has been successfully added.");
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <PageHeading
        title="Tasks"
        rightButton={() => (
          <div className="flex">
            <Button
              onClick={() => setShowNewTaskPane(true)}
              label="New task"
              icon="ri-add-line"
              className="mr-2"
            />
            <UserDropDown />
          </div>
        )}
      />
      {taskList.length > 0 ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteModal(true),
              disabled: !selectedIds.length,
            }}
            paginationProps={{
              count: 241,
              pageNo: 1,
              pageSize: 50,
            }}
            sortProps={{
              options: [
                { value: "title", label: "Title" },
                { value: "description", label: "Description" },
              ],
              onClick: () => {},
            }}
            toggleFilter={() => {}}
          />
          <ListTasks
            taskList={taskList}
            selectedIds={selectedIds}
            onSelectAll={onSelectAll}
            onSelectTask={onSelectTask}
            editClickAction={editClickAction}
            deleteClickAction={deleteClickAction}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyTaskList}
          title="Your task list is empty"
          subtitle=""
          primaryAction={() => setShowNewTaskPane(true)}
          primaryActionLabel="New Task"
        />
      )}
      {showDeleteModal && (
        <DeleteModal onClose={onClose} handleDelete={handleDelete} />
      )}
      <CreateNewTask
        showPane={showNewTaskPane}
        setShowPane={setShowNewTaskPane}
        createNewTask={createNewTask}
      />
    </>
  );
};

export default Tasks;
