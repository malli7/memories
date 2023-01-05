import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import useStyles from './styles';
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from "react-router-dom";
import Paginate from "../Pagination/Pagination";
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();

  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }
    else {
      navigate('/');
    }

  }

  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      searchPost()
    }
  }

  return <Grow in>
    <Container maxWidth="xl">
      <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar position="static" className={classes.appBarSearch} color="inherit">
            <TextField
              name="search"
              variant="outlined"
              label="Search Memories"
              fullWidth={true}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <ChipInput
              style={{ margin: "10px 0 " }}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"

            />
            <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
          </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {
            (!searchQuery && !tags.length) &&
            (<Paper elevation={6}>
              <Paginate page={page} />
            </Paper>)
          }
        </Grid>
      </Grid>
    </Container>
  </Grow>
};

export default Home;
