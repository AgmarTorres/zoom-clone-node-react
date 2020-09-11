const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  port: "3030",
  host: "/",
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

//socket.emit("join-room", ROOM_ID);

socket.on("user-connected", (userId) => {
  connectToNewUser(userId);
});

const connectToNewUser = (userId) => {
  console.log("new user");
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetada", () => {
    video.play();
  });
  videoGrid.append(video);
};
