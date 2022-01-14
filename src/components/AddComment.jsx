import * as React from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function AddComment() {


    const handleClickSendComment = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <FormControl 
            variant="outlined" 
            fullWidth={true}
            multiline={true}>
            <InputLabel htmlFor="addCommentInput">Ajouter un commentaire</InputLabel>
            <OutlinedInput
                id="addCommentInput"
                type='text'
                multiline={true}
                fullWidth={true}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickSendComment}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            <SendOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label="Ajouter un commentaire"
            />
        </FormControl>
    )
}
