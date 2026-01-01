import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, type GridCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import AddWordText from './AddWordText';
import ViewWord from './ViewWord';

function WordList({ data, fetchWords }: { data: any[], fetchWords: () => void }) {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const handleDelete = async (data: any) => {
        try {
            const response = await axios.delete(`http://localhost:8001/word/delete/${data._id}`);
            alert('Word deleted successfully');
            fetchWords()
        } catch (e) {
            console.error('Error deleting word:', e);
        }
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 70, flex: 1 },
        { field: 'title', headerName: 'Title', minWidth: 400, flex: 1 },
        { field: 'description', headerName: 'Description', minWidth: 400, flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            flex: 1,
            renderCell: (params: GridCellParams) => {
                return (
                    <>
                        <Button variant='contained' style={{ marginRight: 10 }} onClick={() => { setSelectedRows(params.row); setOpenEdit(true) }} >Edit</Button>
                        <Button variant='contained' color='error' onClick={() => handleDelete(params.row)}>Delete</Button>
                        <Button onClick={() => { setSelectedRows(params.row); setOpenView(true) }}>View</Button>
                    </>
                )
            }
        }
    ];


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
            {openEdit && (
                <AddWordText open={openEdit} handleClose={() => setOpenEdit(false)} fetchWords={fetchWords} selectedRows={selectedRows} />
            )}
            {openView && (
                <ViewWord open={openView} handleClose={() => setOpenView(false)} selectedRows={selectedRows} />
            )}
        </Box>
    )
}

export default WordList