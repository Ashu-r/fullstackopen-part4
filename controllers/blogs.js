const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
	const user = await User.findById(body.userId);

	const blog = new Blog({
		...request.body,
		likes: request.body.likes ?? 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog);
	await user.save();

	response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
	const blog = {
		likes: request.body.likes,
	};
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		blog,
		{ new: true }
	);
	response.json(updatedBlog.toJSON());
});

module.exports = blogRouter;
