
# LoopSocial

## Description

**LoopSocial** is a social media platform designed to bring people closer. Users can log in to see posts uploaded by others, share their own photos with captions, hashtags, and locations, and like the posts as well. Users can manage update their bio and see their photos in their profile section. The platform also allows users to search for other members and engage in one-on-one chats.

## Features

- **User Authentication**: Secure login and registration.
- **Post Uploads**: Share photos with captions, hashtags, and locations.
- **Profile Management**: Customize and update user profiles.
- **Search Users**: Find and connect with other users.
- **Direct Messaging**: One-on-one chat functionality.

## Tech stack
- **NextJS**: For faster and optimized development environment.
- **Clerk**: For secure google and email authentication.
- **Cloudinary**: For managing and uploading media assets (images here).
- **TailwindCSS**: For custom CSS styling.
- **ShadcnUI**: For using re-usable components throughout the app.
- **Mongoose**: For creating mongoDB queries from NextJS.
- **Zustand**: For managing state context in our app.

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/amratansh12/social-media-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd social-media-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables by creating a `.env` file and adding the necessary keys:
    ```env
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_API_KEY=
    NEXT_PUBLIC_CLOUDINARY_API_SECRET=
    CLOUDINARY_URL=
    CLERK_WEBHOOK_SECRET=
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/home
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/home
    MONGO_URL=
    ```
5. Start the server:
    ```bash
    npm start
    ```

---

## Usage

### Running the App

- Ensure your MongoDB instance is running.
- Start the server using:
    ```bash
    npm run dev
    ```
- Open your browser and navigate to `http://localhost:3000`.

### Navigating the App

- **Login/Register**: Create an account or log in to access the platform.
- **Home Feed**: View posts from other users.
- **Profile**: Manage your profile, view your posts, and update personal information.
- **Search**: Find other users by searching their usernames.
- **Messages**: Start a one-on-one chat with other users.

## Contributing

We welcome contributions! Please follow these guidelines:

- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Commit your changes (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin feature-branch`).
- Create a new Pull Request.

## Contact Information

For any inquiries or support, please contact:

- **Email**: kumaramanpur30nov@gmail.com

## FAQ

**Q: How do create a new post?**
- Go to the home page and click on "Upload photo". Upload photo, enter captions and other field and then post!

**Q: How can I like a photo?**
- A: Open a post and then click on heart icon to like it.

**Q: How do I search a user?**
- A: Go to search page and then search a user using username or his name.

**Q: How do I message a user?**
- A: Open a user's profile and click on message user to open a chat. You can also message existing chat from your "messages" section.


## Acknowledgements

Thanks to ARIES-IITR for providing me the opportunity to deliver this project.

