import { io } from "socket.io-client";

const URL = "http://localhost:3000"; // Replace with your WebSocket server URL
const socket = io(URL);

export default socket;
