# Bitter

The aim of this project is to create a simplified version of Twitter, as an exercise in full-stack development.

- This repository holds only the frontend

## Project

The stack will consist of:

- React (Frontend)
- Django (Backend)
- PostgreSQL (Database)

While I have experience with JavaScript and Python, this will be my first time building a full-stack application, and my first time using Django. Additionally, this will be my first time implementing SQL knowledge that I have developed but not used before.

## CURRENT OVERHAUL

Current to-do list as I move the entire project to AWS, and implement TypeScript.

- [x] Convert files to TS
  - [x] Change file extensions to `.tsx` and deal with errors
  - [x] Specify type of each component (`React.FC`)
  - [x] Identify props required for each component
    - No props => `<{}>`
  - [x] Type each variable

## To-do list

- [x] Add card to portfolio
- [ ] Each tweet gets its own page w replies
- [x] Loading spinners
- [ ] Tweet ID generated through a hash
  - Sort tweets table in database by `created_at`
- [x] Page titles
- [x] Favicon

### Main page

- [x] Resize post box (border cut off)
- [ ] Profile pics
- [ ] Interactions counters
- [x] Display name + handle link to user page
- [ ] Individual pages for tweets
- [ ] User info / Login button in left column

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
- [ ] Set `myId`
- [x] Set `handle`
- [ ] Link to `/register`

### Register

- [ ] Handle + email + password
  - [ ] Check all valid
- [ ] Redirect to "Verify your account" page
- [ ] Link to `/login`
- [ ] Create database entry (use Lambda + Cognito / in `create-api-key`)

### Settings

- [ ] Change email
  - [ ] Authorise user
  - [ ] Check valid email
  - [ ] Change
- [ ] Change password
  - [ ] Authorise user
  - [ ] Check valid password
  - [ ] Change
- [ ] Logout
  - [ ] Confirmation popup
  - [ ] Set `isLoggedIn` to `false`
  - [ ] Set `myId` to `-1`
- [ ] Deactivate account

### Fullstack

- [ ] Assign functions to all buttons
  - Figure out exactly what each should do
  - How do likes/dislikes work?
- [ ] Index follows by destination_id

### After features

- [ ] Notifications
- [ ] Tagging people
