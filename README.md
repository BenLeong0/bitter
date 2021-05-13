# Bitter

The aim of this project is to create a simplified version of Twitter, as an exercise in full-stack development.

- This repository holds only the frontend service

## Project

The stack will consist of:

- React (Frontend, with TypeScript)
- AWS (Backend, previously Django)
- PostgreSQL (Database)

I have previous experience with Javascript, React, and Python, but this will be my first time using TypeScript and Amazon Web Services, and was my first time using Django. Additionally, this will be my first time implementing SQL knowledge that I have developed but not used before.

## OVERHAUL

To-do list as I move the entire backend to AWS, and implement TypeScript.

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
- [x] Success + error message for API calls
  - [x] All `{code: str, message: str}`

## To-do list

- [x] Add card to portfolio
- [x] Loading spinners
- [x] Bit ID generated through a hash
- [x] Page titles + Favicon
- [x] Domain
- [x] 404 page
- [x] `DELETE` HTTP method for unlike etc
- [x] Check if logged in for post interactions
- [x] Profile stats
  - [x] Bits
  - [x] Bits + replies
  - [x] Likes
  - [x] `update_stats` function
- [x] Delete post stat cascade (delete likes etc)
- [x] Admin privileges
  - [x] Create cognito role `admin`
  - [x] Account `isAdmin` hook
  - [x] Delete posts
    - [x] Change frontend (`if (... || isAdmin)`)
    - [x] Change api (extract role)
    - [x] Change lambda (`if ... or role == 'admin'`)
- [x] Edit profile
- [x] Move endpoints for post/delete bits
- [x] Hide post on successful delete
- [x] Hater tag
- [x] Suggested users prioritise unfollowed
  - [x] Change limit to 5
  - [x] If <5, fill remaining with followed
- [x] User page tabs
  - [x] Bits
  - [x] Bits and replies
  - [x] Following
  - [x] Followers
  - [x] Likes
- [x] Replies
  - [x] Reply text box / popup
  - [x] "Reply to" note
  - [x] Database links
  - [x] Bit pages
    - [x] List thread above
    - [x] List replies below
      - [x] Prioritise prethread participants
    - [x] Hide "reply to ..." message
  - [x] User page tab
  - [x] Interaction counter
    - [x] On bit
    - [x] On user page
- [x] Check `status = 1` for all follows / users database calls
- [x] Case insensitive tagging
- [x] Reply / rebit notes side by side instead of stacked
- [x] Regex field verifications (username etc)
- [ ] Viewable list of rebitters/likers/dislikers for posts
- [ ] Hashtags
  - [ ] NoSQL database?

### Timeline

- [x] Post box
  - [x] Resize post box (border cut off)
  - [x] Only empty if post is successful
  - [x] Loading spinner while sending (format!!)
  - [x] "Login / Register" message if not logged in
- [x] Display name + handle link to user page
- [x] User info / Login button in left column
- [x] Profile pic
- [x] All posts timeline (not just following)

### Posts

- [x] Individual pages for posts
- [x] Delete own tweets
  - [x] Popover
  - [x] Lambda function
  - [x] API gateway
  - [x] Fetch function
- [x] Interactions
  - [x] Buttons
  - [x] Counters
- [x] Tagging
- [x] Profile pics
- [x] Replies
  - [x] Delete replied-to posts

### User pages

- [x] Individual pages for each user
  - [x] Display name and banner
  - [x] Profile pic
    - [x] Show on all tweets
    - [x] Darken on hover
  - [x] Banner
  - [x] Bio
  - [x] Join date
  - [x] Follow button
  - [x] Edit profile
    - [x] Single API endpoint for all
    - [x] Button replaces follow button
    - [x] Change display name
    - [x] Change bio
    - [x] Change pic
    - [x] Change banner
  - [x] Tabs
    - [x] Main (no replies)
    - [x] Posts and replies
    - [x] Likes
    - [x] Following list
    - [x] Follower list
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
  - [x] Delete any posts
  - [ ] Delete user
  - [ ] Update follow counts
  - [ ] Update interaction counts
- [ ] Mobile support
- [ ] Notifications / mentions
