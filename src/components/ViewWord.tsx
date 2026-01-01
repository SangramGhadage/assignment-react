import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
export default function ViewWord({ open, handleClose, selectedRows }: { open: boolean; handleClose: () => void, selectedRows: any[] }) {
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
                View Data
            </DialogTitle>
            <DialogContent>

            <p>
                { }
                {<div dangerouslySetInnerHTML={{ __html: selectedRows?.description }} /> || 'No description available'}</p>
            </DialogContent>
            <DialogActions >
                <Button onClick={handleClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
