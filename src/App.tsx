import { useEffect, useState } from 'react'
// import './App.css'
import { Box, Button, Card, CardHeader, Typography } from '@mui/material'
import AddWordText from './components/AddWordText'
import WordList from './components/wordList'
function App() {
  const [open, setOpen] = useState(false)
    const [data, setData] = useState([]);

      const fetchWords = async () => {
        try {
            const response = await fetch('http://localhost:8001/word/get');
            const data = await response.json();
            let words = data?.words?.map((word: any, index: number) => ({
                id: word._id,
                ...word
            }));
            setData(words ?? []);
            console.log('Fetched words:', data);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };
    useEffect(() => {
        fetchWords();
    }, [])
  return (
    <>
      <Card style={{ padding: '20px', margin: '20px' }}>
      <Box display={'flex'} justifyContent='space-between' alignItems='center'>
        <Typography variant="h4" gutterBottom>
          Data List
        </Typography>
        <Button sx={{mb:3}} variant="contained" color="primary" onClick={()=>setOpen(true)}>
          Add 
        </Button>
      </Box>
        <WordList data={data} fetchWords={fetchWords}/>
      </Card>
      {open && (
        <AddWordText open={open} handleClose={() => setOpen(false)} fetchWords={fetchWords}/>
      )}
    </>
  )
}

export default App
