import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {moment} from 'moment';

function calcTime(time) {
    let nDate = new Date();
    let timeDiff;
    if (time.getDate() == nDate.getDate()) {
        timeDiff = `${nDate.getHours() - time.getHours()} hoers ago`;
    }
    else
        if (time.getMonth() == nDate.getMonth())
            timeDiff = `${nDate.getDate() - time.getDate()} days ago`;
        timeDiff=nDate.diff()
}
const OneDonate = (props) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.oneCard.amount}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {calcTime(props.oneCard.timeDonate)}
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}