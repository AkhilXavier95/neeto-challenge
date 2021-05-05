import React, { useState } from "react";
import moment from "moment";

import { Checkbox, Badge } from "neetoui";

import editIcon from "images/editIcon";
import deleteIcon from "images/deleteIcon";

const ListTasks = ({
  taskList,
  selectedIds,
  onSelectAll,
  onSelectTask,
  editClickAction,
  deleteClickAction,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const onMouseEnter = id => {
    setHoveredRow(id);
  };
  const onMouseLeave = () => {
    setHoveredRow(null);
  };
  const actionButton = (id, icon, handleClick) => (
    <div
      className={`mx-1 ${hoveredRow === id ? "opacity-100" : "opacity-0	"}`}
      onClick={handleClick}
    >
      <img src={icon} />
    </div>
  );

  const getColor = tag => {
    if (tag === "Internal") {
      return "blue";
    }
    if (tag === "Bug") {
      return "red";
    }
    if (tag === "workflow") {
      return "green";
    }
  };

  return (
    <div className="w-full px-28">
      <table className="nui-table">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selectedIds.length === taskList.length ? true : false}
                onChange={onSelectAll}
              />
            </th>
            <th className="text-left text-gray-400">TITLE</th>
            <th className="text-left text-gray-400">DESCRIPTION</th>
            <th className="text-center text-gray-400">TAGS</th>
            <th className="text-left text-gray-400">CREATED DATE</th>
            <th className="text-center text-gray-400">DUE DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {taskList.map(task => (
            <tr
              key={task.id}
              className="cursor-pointer bg-white hover:bg-gray-50 text-sm"
              onMouseEnter={() => onMouseEnter(task.id)}
              onMouseLeave={onMouseLeave}
            >
              <td>
                <Checkbox
                  checked={selectedIds.indexOf(task.id) > -1}
                  onChange={e => onSelectTask(e, task.id)}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-purple-500">
                  {task.title}
                </div>
              </td>
              <td>
                <div className="w-40 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {task.description}
                </div>
              </td>
              <td>
                <div className="text-center">
                  <Badge color={getColor(task.tag)}>{task.tag}</Badge>
                </div>
              </td>
              <td>{moment(task.createdDate).format("MMM D, YYYY")}</td>
              <td>
                <div className="text-center">
                  {task.dueDate
                    ? moment(task.dueDate).format("MMM D, YYYY")
                    : "--"}
                </div>
              </td>
              <td>
                <div className="flex">
                  {actionButton(task.id, editIcon, editClickAction)}
                  {actionButton(task.id, deleteIcon, () =>
                    deleteClickAction(task.id)
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTasks;
