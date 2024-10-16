/* eslint-disable react/prop-types */
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Loading = ({ loadingText }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography variant='h4'>{loadingText}</Typography>
        <CircularProgress />
      </Box>
    );
};

export default Loading;