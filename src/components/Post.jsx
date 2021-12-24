import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from '@mui/material/';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {
    let post = {
        Author: props.post.Prenom + ' ' + props.post.Nom,
        CreationDate: props.post.CreationDate,
        Body: props.post.Body,
        initials: props.post.Prenom.substring(0, 1) + props.post.Nom.substring(0, 1),
        Title : props.post.Title
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.initials}
                    </Avatar>
                }
                title={post.Title}
                subheader={post.CreationDate}
            />
            <CardMedia
                component="img"
                height="194"
                image={post.Body} 
                alt={post.Title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.Title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* TODO : Trouver un moyen de présenter les post*/}
                </CardContent>
            </Collapse>
        </Card>
    );
}
