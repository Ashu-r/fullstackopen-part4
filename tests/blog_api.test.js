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
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test('blog returned as json', async () => {
	await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
});

test('lenght of blogs (total blogs)', async () => {
	const response = await api.get('/api/blogs');
	expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
	mongoose.connection.close();
});
