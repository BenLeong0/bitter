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
- [ ] Database to AWS (or other hosting?)
- [ ] API to AWS
  - [x] `create_user` after confirmation
  - [x] `get_timeline(user_id)`
    - Check if logged in or not (i.e. `user_id == ''`)
  - [x] `get_user_data(handle)`
    - [x] For opening user page
    - [x] Include if following check in Lambda
  - [x] `get_user_posts(handle)`
  - [x] `get_suggested_users()`
    - [x] Check if following
  - [~] `check_if_following(source_id, destination_id)`
    - Integrated into other functions
  - [x] `create_follow(destination_id)`
    - [x] Require auth (source_id)
    - [x] User suggestions
    - [x] User pages
  - [x] `delete_follow(destination_id)`
    - [x] Require auth (source_id)
    - [x] User suggestions
    - [x] User pages
  - [ ] `post_bit(content)`
    - [ ] Require auth
- [x] Add user to database after signing up
- [x] Redesign database
  - [x] `user_id = cognito:sub` (string)
  - [x] `post_id` encoded
- [x] Repopulate database
  - [x] Users
  - [x] Follows
  - [x] Test posts

## To-do list

- [x] Add card to portfolio
- [ ] Each tweet gets its own page w replies
- [x] Loading spinners
- [ ] Tweet ID generated through a hash
  - Sort tweets table in database by `created_at`
- [x] Page titles
- [x] Favicon
- [x] Domain
- [x] 404 page
- [ ] Encode + decode api calls

### Main page

- [ ] Post box
  - [x] Resize post box (border cut off)
  - [x] Only empty if post is successful
  - [x] Loading spinner while sending
  - [ ] "Login / Register" message if not logged in
- [ ] Profile pics
- [ ] Interactions counters
- [x] Display name + handle link to user page
- [ ] Individual pages for tweets
- [x] User info / Login button in left column

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
  - [ ] Location?
  - [x] All their tweets
  - [ ] All their likes?
  - [ ] All their replies
  - [ ] Following list
  - [ ] Follower list
- [x] Same side bars
- [~] 'Error' message if no tweets found
  - For each list

### Login

- [x] Handle or email + password
- [x] Set `isLoggedIn` to `true`
- [x] Set `myId`
- [x] Set `handle`
- [x] Link to `/register`
- [x] Error handling
  - [x] Incorrect username/password
  - [x] Not yet verified

### Register

- [x] Handle + email + password
  - [x] Valid handle (no special chars)
  - [x] Valid email (cognito error)
  - [x] Valid password (upper, lower, number, special, >8 chars)
- [ ] Redirect to "Verify your account" message page
- [x] Link to `/login`
- [ ] Create database entry (use Lambda + Cognito / in `create-api-key`)

### Settings

- [ ] Change email
  - [x] Check if email exists
  - [x] Authorise user
  - [x] Check valid email
  - [ ] Confirmation popup
  - [x] Change
  - Instead: send link to new email, clicking link updates and verifies email ?
    - This way, email is only changed after verification
- [ ] Change password
  - [ ] Authorise user
  - [ ] Check valid password
  - [ ] Confirmation popup
  - [ ] Change
- [ ] Logout
  - [ ] Confirmation popup
  - [x] Set `isLoggedIn` to `false`
  - [x] Set `myId` to `''`
- [ ] Deactivate account
  - [ ] Password
  - [ ] Type `delete-me`

### Fullstack

- [ ] Assign functions to all buttons
  - Figure out exactly what each should do
  - How do likes/dislikes work?
- [ ] Index follows by destination_id

### After features

- [ ] Notifications
- [ ] Tagging people
- [ ] Admin features
  - [ ] Delete any posts
  - [ ] Delete user
