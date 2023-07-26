import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { EmailProvider } from "./Context/EmailContext.tsx";
import { UserProvider } from "./Context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <EmailProvider>
      <App />
    </EmailProvider>
  </UserProvider>
);
