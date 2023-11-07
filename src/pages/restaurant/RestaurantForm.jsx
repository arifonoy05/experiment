import React from "react";
import { useDispatch } from "react-redux";

import { closeModal } from "../../components/Modal/modalSlice";

function RestaurantForm() {
  const dispatch = useDispatch();

  function handleModalClose(){
    dispatch(closeModal())
  }
  
  return (
    <React.Fragment>
      <div className="w-full">
        <form className="bg-white shadow-md rounded p-6 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="active"
                name="active"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="active" className="font-medium text-gray-900">
                Active
              </label>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="bg-red-600 px-4 py-2 rounded text-white" type="button" onClick={handleModalClose}>Cancel</button>
            <button className="bg-green-600 px-4 py-2 rounded text-white" type="button">Save</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default RestaurantForm;
