import axios from 'axios';

const API = axios.create({ baseURL: 'https://memories-backend-ukqf.onrender.com/' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.token = JSON.parse(localStorage.getItem('profile')).token;
    }

    return req;
})

export const getPosts = (page) => API.get(`/posts?page=${page}`);

export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);



export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);

