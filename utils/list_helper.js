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
		likes: mostLikedBlog.likes,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
