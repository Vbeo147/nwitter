import AppRouter from "components/Router";
import { useEffect, useState } from "react";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserobj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserobj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
