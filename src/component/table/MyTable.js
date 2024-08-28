import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import './Mytable.css';
import { dataFetch } from '../common/common';
import axios from 'axios';

const MyTable = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const data_Fetch = async () => {
            try {
                const response = await axios.get(dataFetch + 'api/user/findAll', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                    },
                });

                if (response?.data) {
                    setData(response.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                setData([]);
                console.log(error);
            }
        };

        data_Fetch();
    }, []);

    useEffect(() => {
        const userRole = localStorage.getItem('user');

        // Define columns and conditionally remove the "Actions" column if not an admin
        const cols = [
            // {
            //     accessorKey: 'id',
            //     header: 'ID',
            // },
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'emailId',
                header: 'Email ID',
            },
            {
                accessorKey: 'mobileNo',
                header: 'Mobile No',
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row)}>Delete</button>
                    </div>
                ),
            },
        ];

        // Remove "Actions" column if the user is not an Admin
        if (userRole !== "Admin") {
            setColumns(cols.filter(col => col.id !== 'actions'));
        } else {
            setColumns(cols);
        }
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleEdit = (row) => {
        const newFirstName = prompt('Enter new first name:', row.original.firstName);
        if (newFirstName) {
            setData(prevData =>
                prevData.map(item =>
                    item.id === row.original.id
                        ? { ...item, firstName: newFirstName }
                        : item
                )
            );
        }
    };

    const handleDelete = (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.original.firstName}?`)) {
            setData(prevData => prevData.filter(item => item.id !== row.original.id));
        }
    };

    return (
        <div className='view'>
            <div className='tablebody'>
                <p className='header'>Table View</p>
                <div className='card tablecls'>
                    <table className="table table-bordered">
                        <thead className="bg-primary text-white">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        onClick: header.column.getToggleSortingHandler(),
                                                        style: { cursor: 'pointer', fontFamily: '-moz-initial' },
                                                    }}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted()] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, index) => (
                                <tr key={row.id} style={{ backgroundColor: 'red' }}>
                                    {/* <td>{index + 1}</td> */}
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTable;
