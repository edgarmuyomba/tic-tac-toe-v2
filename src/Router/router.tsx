import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Welcome from "../components/welcome/welcome";
import Game from "../components/Game/Game";
import JoinGame from "../components/JoinGame/JoinGame";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import App from "../components/App/App";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Welcome />,
                    errorElement: <ErrorElement />
                },
                {
                    path: 'game/:type',
                    element: <Game />,
                    errorElement: <ErrorElement />
                },
                {
                    path: 'join_game/',
                    element: <JoinGame />,
                    errorElement: <ErrorElement />
                }
            ]
        },
    ]

    );

    return <RouterProvider router={router} />
}