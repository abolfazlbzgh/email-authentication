import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Verify from "./pages/Verify"
import Home from "./pages/Home"
import RequestChangePassword from "./pages/RequestChangePassword"
import ChangePassword from "./pages/ChangePassword"
const routes = [

    { path: "/", element: <Home/> },
    { path: "/login", element: <Login /> },
    { path: "/verify", element: <Verify /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/requestChangePassword", element: <RequestChangePassword /> },
    { path: "/requestChangePassword/changePassword", element: <ChangePassword /> },
]

export default routes;