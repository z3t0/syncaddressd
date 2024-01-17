# syncaddressd

Synchronize balances and transactions for bitcoin addresses, HTTP interface.

Thank you for taking the time to review my take home, I look forward to meeting you and going through my submission.

## Development
- System Requirements
  - Nodejs
  - NPM

Clone the repo, and run the instructions below.

```sh
$ npm install
$ npm start # In your first shell
$ npm test # In another shell for live test feedback
```

Your server will automatically restart if the source code changes.
## Documentation

### Assumptions made
- The service will run on a single machine.
- Backups will be done at a disk level.

### Architectural decisions
#### Decisions made for meeting time constraints
##### Use the disk for data storage, and the  memory for querying:
 - SSDs are fast.
 - Memory will page to SSDs as the number of addresses tracked grows. This is not ideal but with a large enough SSD you can far enough to buy you the time to upgrade to using a real db.
 - Advantages of using JSON on disk include simple programming model, simple backup model.
 - Disadvantages include reduced performance, query facilities and inefficient use of disk, cpu and ram.
 - In the future, I would use SQLite or UnQlite or a similar embedded database if we are doing a single node.
  - If there will be multiple nodes then rqlite, mongodb (replicated), couchdb (multi-master) are all potential options
  - There is also the option of postgreSQL.

##### Save the address info on fetch to the local database
- It would be a bead idea to make a request to the backend service, such as blockchain.com, on every user request. We will hit their rate limits quickly and be blocked.
- I have chosen to save it to a local db so we only reach the backend service if we don't have already cache of the address balance/transactions.
- Everytime we go through to the backend service, we save the result so that next time our cache is a hit instead of a miss.

##### Syncing with backend
- Overtime our cached address info will go out of date as the blockchain network continues producing blocks.
- I scaffolded out a minimal solution to this in src/service.ts.
- We clone the current in memory database, so we can iterate without having the data change under us.
- Then we fetch the new address info for each address we are tracking. In this step, we add some delay between each request to avoid being blocked by the backend explorer API.
- Once we have all of our new address info we merge this information back into the current db.
- It is important to do a merge because by the time we are done syncing our addresses, with delay, new addresses may have been added to our db. This is because we are iterating on a deep copy of the db which becomes stale as soon as new addresses are being tracked by our system. A new address begins to be tracked as users are still using our API while we are syncing the frozen db.
- This does introduce an issue where the addresses will have been refreshed at different times.
- There are solutions to this problem, but I'll leave it at that for now and we can discuss further.

#### Technology Stack Decisions
- I chose to use Node.js with Typescript for the programming system. This is a familiar stack for me and many others building web apps. I wanted my solution to be well-understood and easy to maintain into the future.
- Koajs was selected as I am familiar with it and it is a bit simple than expressJs. For a team project I would prefer to use what the team was used to or was using in other places.
- Jest is used for testing as it is quick to get up and running and has good support for common web development patterns.
  - I particularly liked jest for its built in watch mode and typescript support




### A little bit about my development environment

- I am currently writing this README using a Thinkpad X1 Yoga 2 in 1 with an 6th gen i7. It's an older device, but has a built in stylus, which allows me to quickly draw up diagrams and whiteboard during design discussions with my colleagues.
- My editor is emacs for programming, and I use vim on occasion when logging into a new server or for looking at large files.
- My development environment is running on a debian vm that I am connected to from my Windows thinkpad. I am using mosh + tmux + emacs
- Oh also I'm using fish for my shell for its autocomplete, which makes things a lot faster at times.
- I've got a few screenshots below so this is easier to visualise.
