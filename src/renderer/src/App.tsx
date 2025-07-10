const App = (): React.JSX.Element => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  return (
    <>
      <h1>Hello Vite + React!</h1>
      <button type="button" onClick={ipcHandle}>
        Send IPC
      </button>
    </>
  );
};

export default App;
