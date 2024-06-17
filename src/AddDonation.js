import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Box, color } from '@mui/system';
import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState, useCallback, useMemo } from 'react';
import "./AddDonation.css"
const AddDonation = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [amount, setAmount] = useState('');
    const [dedication, setDedication] = useState('');
    // function getFirstName(e) {
    //     setFirstName(e.target.value);
    // }
    // function getLastName(e) {
    //     setLastName(e.target.value);
    // }
    // function getAmount(e) {
    //     setAmount(e.target.value);
    // }
    // function getDedication(e) {
    //     setDedication(e.target.value);
    // }
    const getFirstName = useMemo(() => (e) => setFirstName(e.target.value), [setFirstName]);
    const getLastName = useMemo(() => (e) => setLastName(e.target.value), [setLastName]);
    const getAmount = useMemo(() => (e) => setAmount(e.target.value), [setAmount]);
    const getDedication = useMemo(() => (e) => setDedication(e.target.value), [setDedication]);
    const addDonate = useCallback(() => {
        if (firstName && amount) {
            const newDonate = {
                "firstName": firstName,
                "lastName": lastName,
                "amount": amount,
                "dedication": dedication
            }
            props.setArrDonation(prevArr => [...prevArr, newDonate]);
            console.log(props.arrDonation);
        }

    })
    return (<>

        <form>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField required id="outlined-basic" label="First name" variant="outlined" value={firstName} onChange={getFirstName} />
                <TextField id="outlined-basic" label="family name" variant="outlined" value={lastName} onChange={getLastName} />
                <TextField required id="outlined-basic" label="Amount" variant="outlined" value={amount} onChange={getAmount} />
                <TextField id="outlined-multiline-static" label="Dedication" multiline rows={5} value={dedication} onChange={getDedication} />
                {/*style={'CssTextField'.{'&.Mui-focused fieldset'.{backgroundColor='red'}}}*/}
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" endIcon={<SendIcon />} style={{ backgroundColor: 'green' }} onClick={addDonate}>Send</Button>
                </Stack>
                <Button
                    sx={{
                        backgroundColor: 'pink',
                        '&:hover': {
                            borderColor: 'red',
                        },
                    }}
                >
                    Click me
                </Button>
            </Box>
        </form>
    </>);
}

export default AddDonation;
