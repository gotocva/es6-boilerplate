const axios = require('axios');
require('dotenv').config();

const app = "http://localhost:3000"; // Your server's base URL
jest.setTimeout(10000); // Set timeout to 10 seconds

let createdUser = null;

describe('User Management API', function () {
    // Test for creating a user
    it('should create a new user', async function () {
        const response = await axios.post(`${app}/api/v1/users`, {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securepassword',
        });

        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('_id');
        expect(response.data.name).toBe('John Doe');
        expect(response.data.email).toBe('john@example.com');

        createdUser = response.data;
    });

    // Test for reading all users
    it('should get all users', async function () {
        const user = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'securepassword',
        };

        const response = await axios.get(`${app}/api/v1/users`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveLength(1);
        expect(response.data[0].name).toBe('John Doe');
    });

    // Test for reading a single user by ID
    it('should get a user by ID', async function () {
        const user = createdUser;

        const response = await axios.get(`${app}/api/v1/users/${user._id}`);
        expect(response.status).toBe(200);
        expect(response.data.name).toBe('John Doe');
    });

    // Test for updating a user by ID
    it('should update a user by ID', async function () {
        const user = {
            name: 'Old Name',
            email: 'old@example.com',
            password: 'securepassword',
        };

        const response = await axios.put(`${app}/api/v1/users/${createdUser._id}`, {
            name: 'New Name'
        });

        expect(response.status).toBe(200);
        expect(response.data.name).toBe('New Name');
    });

    // Test for deleting a user by ID
    it('should delete a user by ID', async function () {
        
        const response = await axios.delete(`${app}/api/v1/users/${createdUser._id}`);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('User deleted');

        // Check if the user has been deleted
        try {
            await axios.get(`${app}/api/v1/users/${createdUser._id}`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });
});
