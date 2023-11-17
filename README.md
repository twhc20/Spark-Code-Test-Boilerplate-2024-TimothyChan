# Setup
If not already installed, please install the following:
1. Go ([install instructions](https://go.dev/doc/install))
2. Node ([download page](https://nodejs.org/en/download))

We have tested this with Node 20. You may have issues if you try to use a different version

# Running
Open two separate terminals - one for the React app and one for the golang API

## Golang API
1. In the first terminal, change to the backend directory (`cd backend`)
2. Run `go run main.go` to start the API server

This must be running for the frontend to work
When you make a change, you must stop the server (`ctrl-c` in the terminal), and restart it with `go run main.go`

## React App
1. In the second terminal, change to the frontend directory (`cd frontend`)
2. Run `npm start` to start the React app server
3. If it doesn't open automatically, open [http://localhost:3000](http://localhost:3000) to view your website

Leave this running. It will automatically update when you make any changes
