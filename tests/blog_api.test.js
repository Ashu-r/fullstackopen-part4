const mongoose = require('mongoose');

const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

const initialBlogs = [
	{
		title: 'How does arrow function work?',
		author: 'Juan',
		url: 'www.jsstuff.com/article/arrow_functions',
		likes: 148,
	},
	{
		title: 'How does normal function work?',
		author: 'Juan',
		url: 'www.jsstuff.com/article/normal_functions',
		likes: 120,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

describe('json and total blogs', () => {
	test('blog returned as json', async () => {
		await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
	});

	test('lenght of blogs (total blogs)', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body).toHaveLength(initialBlogs.length);
	});
});

describe('step 2 identifying property is id not _id', () => {
	test('identify id', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0].id).toBeDefined();
	});
});

describe('step 3 verifying POST request creates new blog', () => {
	test('post', async () => {
		const newBlog = {
			title: 'How does async await work?',
			author: 'Ash',
			url: 'www.jsstuff.com/article/async_await',
			likes: 104,
		};

		await api.post('/api/blogs').send(newBlog);
		const response = await api.get('/api/blogs');
		expect(response.body).toHaveLength(initialBlogs.length + 1);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
