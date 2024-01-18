import logo from "Common/Assets/SVG/logo.svg";
import { FC, useEffect } from "react";
import "./index.scss";

const App: FC = () => {
  useEffect(() => {
    if (!window.electronAPI) return;

    window.electronAPI.send("HelloWorld");
    window.electronAPI.receive("HelloWorld", (_: any, result: any) => {
      console.log(result.message);

      window.electronAPI.removeAllListeners("selectDir");
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
