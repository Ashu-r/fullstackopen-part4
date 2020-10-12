const dummy = () => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, item) => {
		return sum + item.likes;
	}, 0);
};

const favoriteBlog = (blogs) => {
	const mostLikedBlog = blogs.reduce((acc, item) => {
		return acc.likes > item.likes ? acc : item;
	}, blogs[0]);
	return {
		title: mostLikedBlog.title,
		author: mostLikedBlog.author,
		url: mostLikedBlog.url,
		likes: mostLikedBlog.likes,
	};
};

const initialBlogs = [
	{
		title: "How does arrow function work?",
		author: "Juan",
		url: "www.jsstuff.com/article/arrow_functions",
		likes: 148,
	},
	{
		title: "How does normal function work?",
		author: "Juan",
		url: "www.jsstuff.com/article/normal_functions",
		likes: 120,
	},
];

const newBlog = {
	title: "How does async await work?",
	author: "Ash",
	url: "www.jsstuff.com/article/async_await",
	likes: 104,
};

const newBlogNoLikes = {
	title: "How does map funcion work?",
	author: "Ash",
	url: "www.jsstuff.com/article/es6_map",
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	initialBlogs,
	newBlog,
	newBlogNoLikes,
};
