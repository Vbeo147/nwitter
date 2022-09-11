import AppRouter from "components/Router";
import { useState } from "react";
import { authService } from "myBase";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(authService.currentUser);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
