# Simple Chat
A simple peer-to-peer chat app by [Sienna M. Wood](https://siennamwood.com/).

## Getting Started
1. Requirements:
    - [node](https://nodejs.dev/) 10.24.0 or later (includes [npm](https://www.npmjs.com/get-npm))
    - [yarn](https://yarnpkg.com/)
        ```shell script
          # install yarn globally
          npm install -g yarn
        ```     
1. Install and run:
    ```shell script
    # clone repository
    git clone https://github.com/siennamw/simple-chat.git
    cd simple-chat

    # install dependencies
    yarn

    # start development server
    yarn start
    ```
1. Open [http://localhost:3000](http://localhost:3000) in a browser to view the running app. A peer-to-peer session will be created automatically for this user, making it ready for additional users to join.
1. Click the link to join the chat and a second tab will open.  The two will be automatically connected in a peer-to-peer session. Additional users can join the session in the same way.
1. Switch between the tabs to send chat messages between them.

![screen shot](./public/screen-shot.png)

## Test
To run all tests once:
```
yarn test --watchAll=false
```

## Notes
- [PeerJS](https://peerjs.com/), the library being used to establish peer-to-peer connections, uses [WebRTC](https://webrtc.org/).  Support for WebRTC is improving rapidly, but still has [some limitations](https://caniuse.com/?search=webrtc).
- To broker peer-to-peer connections, [PeerJS](https://peerjs.com/) provides a free cloud-hosted PeerServer, which this project uses. In a production environment, it might be preferable to [run our own PeerServer](https://github.com/peers/peerjs-server) to have more control and transparency over this process.
- Currently there are no hard limits on the number of peers that can connect to each other. There are certainly practical limits, however, and I would expect more and more bugs and performance issues as the number of peers increases.
- Using peer-to-peer connections means that there is no way to capture or monitor chat content.  This may not be desirable, depending on business needs.
- Currently there are no tests for `peer.service.js`, which is a critical component of the app. This is because the test setup bundled in [create-react-app](https://create-react-app.dev/) is geared towards testing React components and user interactions with the UI, so it will take some time to sort out leveraging this system to test the peer-to-peer service.
