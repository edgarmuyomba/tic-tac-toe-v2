import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from "../components/welcome/welcome";
import Game from "../components/Game/Game";
import JoinGame from "../components/JoinGame/JoinGame";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Welcome />
        },
        {
            path: 'new_game/',
            element: <Game />
        },
        {
            path: 'join_game/',
            element: <JoinGame />
        }
    ]
    );

    return <RouterProvider router={router} />
}