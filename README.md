# Bitter

The aim of this project is to create a simplified version of Twitter, as an exercise in full-stack development.

- This repository holds only the frontend

## Project

The stack will consist of:

- React (Frontend, with TypeScript)
- Django (Backend)
- PostgreSQL (Database)

While I have experience with JavaScript and Python, this will be my first time building a full-stack application, and my first time using TypeScript and Django. Additionally, this will be my first time implementing SQL knowledge that I have developed but not used before.

## CURRENT OVERHAUL

Current to-do list as I move the entire project to AWS, and implement TypeScript.

- [x] Convert files to TS
  - [x] Change file extensions to `.tsx` and deal with errors
  - [x] Specify type of each component (`React.FC`)
  - [x] Identify props required for each component
    - No props => `<{}>`
  - [x] Type each variable
- [x] API to AWS
  - [x] `create_user` after confirmation
  - [x] `get_timeline(user_id)`
    - Check if logged in or not (i.e. `user_id == ''`)
  - [x] `get_user_data(handle)`
    - [x] For opening user page
    - [x] Include if following check in Lambda
  - [x] `get_user_posts(handle)`
  - [x] `get_suggested_users()`
    - [x] Check if following
  - [x] `create_follow(destination_id)`
    - [x] Require auth (source_id)
    - [x] User suggestions
    - [x] User pages
  - [x] `delete_follow(destination_id)`
    - [x] Require auth (source_id)
    - [x] User suggestions
    - [x] User pages
  - [x] `post_bit(content)`
    - [x] Require auth
- [x] Add user to database after signing up
- [x] Redesign database
  - [x] `user_id = cognito:sub` (string)
  - [x] `post_id` encoded
- [x] Repopulate database
  - [x] Users
  - [x] Follows
  - [x] Test posts
- [ ] Success + error message for API calls
  - [ ] Lambda functions
  - [ ] Message popup

## To-do list

- [x] Add card to portfolio
- [x] Loading spinners
- [x] Bit ID generated through a hash
  - Sort tweets table in database by `created_at`
- [x] Page titles
- [x] Favicon
- [x] Domain
- [x] 404 page
- [x] Organise account file
- [x] Each tweet gets its own page
- [x] Tagging
- [x] Interactions counters
  - [x] Like
    - [x] Frontend
    - [x] Backend post
    - [x] Backend get
  - [x] Unlike
    - [x] Frontend
    - [x] Backend post
    - [x] Backend get
  - [x] Dislike
    - [x] Frontend
    - [x] Backend post
    - [x] Backend get
  - [x] Undislike
    - [x] Frontend
    - [x] Backend post
    - [x] Backend get
- [x] Rebits
  - [x] Separate table
  - [x] Fetch
  - [x] Create
  - [x] Delete
- [x] `DELETE` HTTP method for unlike etc
- [x] Check if logged in for post interactions
- [x] Profile stats
  - [x] Bits
  - [x] Bits + replies
  - [x] Likes
  - [x] `update_stats` function
- [x] Delete post stat cascade
  - [x] Decrement like/dislike counters
  - [x] Delete like/dislike edges
- [ ] Edit profile
- [ ] Replies
  - [ ] Database links
  - [ ] Bit pages
  - [ ] User page tab (hide from "main" tab)
  - [ ] Interaction counter
- [ ] Hashtags

### Timeline

- [x] Post box
  - [x] Resize post box (border cut off)
  - [x] Only empty if post is successful
  - [x] Loading spinner while sending (format!!)
  - [x] "Login / Register" message if not logged in
- [x] Display name + handle link to user page
- [x] User info / Login button in left column
- [ ] Profile pic

### Posts

- [x] Individual pages for posts
- [x] Delete own tweets
  - [x] Popover
  - [x] Lambda function
  - [x] API gateway
  - [x] Fetch function
- [x] Interactions counters
- [x] Tagging
- [ ] Profile pics
- [ ] Replies

### User pages

- [ ] Individual pages for each user
  - [x] Display name and banner
  - [x] Profile pic
  - [x] Banner
  - [x] Bio
  - [x] Join date
  - [x] Follow button
  - [ ] Edit profile
    - [ ] Button replaces follow button
    - [ ] Change display name
    - [ ] Change bio
    - [ ] Change pic
    - [ ] Change banner
  - [x] All their tweets
  - [ ] All their likes?
  - [ ] All their replies
  - [ ] Following list
  - [ ] Follower list
- [x] Same side bars
- [x] 'Error' message if no tweets found

### Login

- [x] Handle or email + password
- [x] Set `isLoggedIn` to `true`
- [x] Set `myHandle`
- [x] Link to `/register`
- [x] Error handling
  - [x] Incorrect username/password
  - [x] Not yet verified
- [x] Generic error message

### Register

- [x] Handle + email + password
  - [x] Valid handle (no special chars)
  - [x] Valid email (cognito error)
  - [x] Valid password (upper, lower, number, special, >8 chars)
- [x] "Verify your account" message
- [x] Link to `/login`
- [x] Create database entry (use Lambda + Cognito / in `create-api-key`)
- [x] Generic error message

### Settings

- [x] Change email
  - [x] Check if email exists
  - [x] Authorise user
  - [x] Check valid email
  - [x] Confirmation popup
  - [x] Change
- [x] Change password
  - [x] Check valid password
  - [x] Check passwords match
  - [x] Authorise user
  - [x] Confirmation popup
  - [x] Change
- [x] Logout
  - [x] Confirmation popup
  - [x] Set `isLoggedIn` to `false`
  - [x] Set `myHandle` to `''`
- [x] Deactivate account
  - [x] Get accessToken
  - [x] Password
  - [x] Type `delete-me`
  - [x] Confirmation popup
  - [x] Error messages
    - [x] Wrong inputs
    - [x] Generic
  - [x] Loader

### After features

- [ ] Admin features
  - [ ] Delete any posts
  - [ ] Delete user
  - [ ] Update follow counts
  - [ ] Update interaction counts
- [ ] Mobile support
- [ ] Notifications / mentions