import { useEffect, useState } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import Textarea from "@mui/joy/Textarea";

function App() {
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = socketIOClient("https://live-text-editor-backend.onrender.com");

    s.on("serverData", (data) => {
      console.log(data);
      setText(data);
    });

    setSocket(s);
  }, []);

  const handleOnChange = (e) => {
    const paragraph = e.target.value;
    setText(paragraph);

    if (socket) {
      socket.emit("clientText", paragraph);
    }
  };

  return (
    <div className="app">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-md">
          <a class="navbar-brand heading" href="#">
            Live Text Editor
          </a>
        </div>
      </nav>
      <Textarea
        type="text"
        className="input"
        value={text}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default App;
