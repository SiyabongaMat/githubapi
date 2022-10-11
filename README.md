# Gitapi

This is a program that uses a `React` frontend and an `Express` backend. The react prompts the user for input and interaction, which is parsed to the express backend which executes a fetch api to return data to the frontend. Data is extracted from both `Github` and `Gitlab` VC's.

## Installation

To install the `node_modules` file and its dependencies, go to the express directory through the terminal and type:
```bash
npm install
```

To install the node_modules files for the react folder go the frontend directory and open the terminal and again type:
```bash
npm install
```

## Usage

Since the react file uses the express server as a proxy server, they should both be running simultaneously for the application to function properly. Open the terminal from each of the projects directories - for the react directory go into the frontend folder and for the express, open the githubapi folder and type the command below:
```bash
npm start
```
The servers for both the directories will run and communication between the two servers will work properly.