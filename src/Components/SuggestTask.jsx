import React, { memo } from 'react'

 function SuggestTask({ task, onCheckboxChange, isChecked }) {
  return (
    <li className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-5 h-5 accent-green-500"
          checked={isChecked}
          onChange={() => onCheckboxChange(task.id)}
        />
        <span className="text-gray-800">{task.text}</span>
      </div>
    </li>
  );
}
export default memo(SuggestTask);