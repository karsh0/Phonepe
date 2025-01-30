// import { useEffect, useRef } from "react";

// export function useSocket() {
//   const socketRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     // Initialize WebSocket connection
//     const socket = new WebSocket("ws://localhost:8080");
//     socketRef.current = socket;

//     // Handle connection events
//     socket.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket disconnected");
//     };

//     // Cleanup on unmount
//     return () => {
//       socket.close();
//     };
//   }, []);

//   return socketRef.current;
// }
