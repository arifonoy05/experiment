import React, { useEffect, useState } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';

async function fetchData() {
    const url = "http://localhost:8080/api/restaurants/all";
    const response = await fetch(url).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
    // console.log(response);

    return response;
}
const columnHelper = createColumnHelper();
// const columns = [
//     columnHelper.accessor('id', {
//         cell: info => info.getValue(),
//     }),
//     columnHelper.accessor('name', {
//         cell: info => info.getValue(),
//     }),
//     columnHelper.accessor('active', {
//         cell: info => info.getValue() ? "Yes" : "No"
//     }),
//     columnHelper.accessor('id', {
//         cell: info => (<button className='btn btn-blue'>Button</button>)
//     }),

// ]

function handleButtonClick(e, row){
    console.log(row.original.foodCategoryEntities);
}

const columns = [
    {
        Header: 'ID',
        accessorKey: "id"
    },
    {
        Header: 'name',
        accessorKey: "name"
    },
    {
        Header: 'active',
        accessorKey: "active"
    },
    {
        Header: 'action',
        accessorKey: "action",
        id: 'click-me-button',
        cell: ({ row }) => (<button onClick={(e) => handleButtonClick(e, row)}>Click Me</button>)
    },
]

function Table() {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        async function responseData() {
            const res = await fetchData();
            setApiData(res)
        }
        responseData()
    }, [])

    const table = useReactTable({
        data: apiData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    console.log(apiData, table.getRowModel().rows);

    return (
        <>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase " >
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
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table