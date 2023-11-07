import React, { useEffect, useState, Fragment, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { openModal } from "../../components/Modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {getRestaurantList} from '../../features/restaurant'
import RestaurantForm from "./RestaurantForm";

function handleButtonClick(e, row) {
  console.log(row.original.foodCategoryEntities);
}

const columns = [
  {
    Header: "ID",
    accessorKey: "id",
  },
  {
    Header: "name",
    accessorKey: "name",
  },
  {
    Header: "active",
    accessorKey: "active",
  },
  {
    Header: "action",
    accessorKey: "action",
    id: "click-me-button",
    cell: ({ row }) => (
      <button onClick={(e) => handleButtonClick(e, row)}>Click Me</button>
    ),
  },
];

const RestaurantList = () => {
  const restaurant = useSelector((store) => store.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantList())
  },[]);

  const table = useReactTable({
    data: !restaurant.isLoading ? restaurant.value : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function addNewRestaurantModal() {
    const modalContent = <RestaurantForm />
    dispatch(openModal({
      content: modalContent
    }));
  }

  return (
    <>
      <div className="w-full flex justify-end">
        <button type="button" onClick={addNewRestaurantModal}>
          <PlusIcon /> Add
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RestaurantList;
