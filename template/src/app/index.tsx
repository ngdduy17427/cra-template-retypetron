import logo from "assets/svgs/logo.svg";
import { FC, useEffect } from "react";
import "./css.scss";

const App: FC = () => {
  useEffect(() => {
    if (!window.electronAPI) return;

    window.electronAPI.send("HelloWorld");
    window.electronAPI.receive("HelloWorld", (_: Electron.IpcRendererEvent, result: any) => {
      console.log(result.message);

      window.electronAPI.removeAllListeners("HelloWorld");
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
