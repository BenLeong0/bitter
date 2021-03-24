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
- [ ] Loading spinners
- [ ] Tweet ID generated through a hash
  - Sort tweets table in database by `created_at`
- [ ] Title
- [ ] Favicon

### Main page

- [x] Resize post box (border cut off)
- [ ] Profile pics
- [ ] Interactions counters
- [x] Display name + handle link to user page
- [ ] Individual pages for tweets

### User pages

- [ ] Individual pages for each user
  - [x] Display name and banner
  - [x] Profile pic
  - [x] Banner
  - [x] Bio
  - [ ] Join date
  - [x] Follow button
  - [ ] Edit profile button (instead of follow)
  - [ ] Location?
  - [x] All their tweets
  - [ ] All their likes?
  - [ ] All their replies
  - [ ] Following list
  - [ ] Follower list
- [x] Same side bars
- [ ] Message if no tweets found
  - For each list

### Settings

- [ ] Change handle
- [ ] Change display name
- [ ] Deactivate account
- [ ] Delete account (?)

### Fullstack

- [ ] Assign functions to all buttons
  - Figure out exactly what each should do
  - How do likes/dislikes work?
- [ ] Index follows by destination_id
