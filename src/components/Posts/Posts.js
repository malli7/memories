import React from "react";
import Post from "./Post/Post";
import useStyles from './styles';
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";


const Posts = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const { posts } = useSelector((state) => state.posts);


  return (
    !posts?.length ? <CircularProgress /> :
      <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        ))}

      </Grid>
  );
};

export default Posts;
