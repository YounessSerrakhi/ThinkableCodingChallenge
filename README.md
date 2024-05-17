# SERRAKHI Hiking Blog

Welcome to my personal hiking blog! This web application allows me to share my hiking and trekking experiences with others. It is built using NextJS for both the backend and frontend, ensuring a smooth and responsive user experience.

Note: The idea of creating this app was inspired by the challenge to be accepted as an intern at Thinkable. I want to express my gratitude to Thinkable for providing this opportunity.

## Table of Contents
1. [Features](#features)
2. [Technical Stack](#technical-stack)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Testing](#testing)
6. [Future Enhancements](#future-enhancements)
7. [Contributing](#contributing)

## Features
- **Create**: I can create a new blog post by providing a title, subtitle, and content.
- **Read**: All users can view a list of all blog posts and read the details of each post.
- **Update**: I can update the title, subtitle, and content of an existing blog post.
- **Delete**: I can delete a blog post I no longer wish to keep.
- **Search**: Users can search for blog posts by title, subtitle, or content.
- **Pagination**: Users can paginate through the list of blog posts.
- **Rich Text Editor**: Optional feature to use a rich text editor for creating and editing blog post content.
- **CI/CD Pipeline**: Implement a CI/CD pipeline using GitHub Actions for running build and tests.

## Technical Stack
- **Frontend**: NextJS
- **Backend**: NextJS (API Routes)
- **Database**: PostgreSQL (using Prisma)
- **Testing**: Jest
- **CI/CD**: GitHub Actions

## Setup Instructions

1. Ensure PostgreSQL is installed and running.
2. Follow the [Prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb) to set up Prisma for MongoDB.
3. Seed the database with Faker data by running:
    ```bash
    npx ts-node scripts/seed.ts
    ```
4. Test the database connection by running:
    ```bash
    npx ts-node scripts/testConnection.ts
    ```

## Usage

- **Creating a Blog Post**: Navigate to the "New Post" page and provide a title, subtitle, and content for your post.
- **Viewing Blog Posts**: Explore the list of all blog posts on the homepage. Click on a post to view its details.
- **Updating a Blog Post**: Click on the "Edit" button on a post to update its title, subtitle, and content.
- **Deleting a Blog Post**: Click on the "Delete" button on a post to remove it from your blog.

## Testing

To run unit tests, use the following command:

```bash
npm run test

 ```
## Future Enhancements
- **Deployment**: Dockerize the application using Docker Compose for simplified setup and deployment.
- **Additional Functionality**: Add user authentication, comments, categories, etc.
- **Performance Optimization**: Optimize the application for better performance and scalability.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests for any improvements or bug fixes amd feel free to mention any issues or starting a conversation.
