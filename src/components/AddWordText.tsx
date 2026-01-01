import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
} from "@mui/material";
import { Editor } from '@hugerte/hugerte-react';
import axios from 'axios'
function AddWordText({ open, handleClose, fetchWords, selectedRows }: { open: boolean; handleClose: () => void, fetchWords: () => void, selectedRows?: any }) {
    const editorRef = React.useRef(null);

    const [description, setDescription] = useState(selectedRows ? selectedRows.description : '')
    const [title, setTitle] = useState(selectedRows ? selectedRows.title : '')
    const handleEditorChange = (content: string) => {
        setDescription(content);
    };
    const handleSave = async () => {
        if (!title) {
            alert('Title is required');
            return;
        }
        if (!description) {
            alert('Description is required');
            return;
        }
        try {
            let url = selectedRows ? `http://localhost:8001/word/update/${selectedRows._id}` : 'http://localhost:8001/word/create';
            const response = await axios.post(url, {
                description: description,
                title: title
            });
            console.log('Word added successfully:', response.data);
            fetchWords()
            handleClose();
        } catch (e) {
            console.error('Error adding word:', e);
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="maintenance-title"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                {selectedRows ? 'Update' : 'Add'} New Data
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3} >
                    <Grid size={12} sx={{ marginTop: '20px' }}>
                        <FormControl fullWidth size='small'>

                            <TextField size='small' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} label='Title' placeholder='Title' />
                        </FormControl>
                    </Grid>
                    <Grid size={12} style={{ marginTop: '20px' }}>

                        <label>Description</label>
                        <Editor
                        // @ts-ignore
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                height: 300,
                                branding: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                skin:
                                    "oxide",
                                content_css: "default",
                            }}
                            // @ts-ignore
                            branding={false}
                            initialValue={selectedRows ? selectedRows.description : ''}
                            onEditorChange={handleEditorChange}

                        />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddWordText