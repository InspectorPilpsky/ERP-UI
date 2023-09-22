import { RouterProvider } from 'react-router-dom'
import { useRouter } from './useRouter'

function App() {
  
  const router = useRouter();

  return (
    //TODO: ErrorBoundary
    // TODO: Notifications wrapper
    // TODO: Auth provider
    <RouterProvider router={router} />
  )
}

export default App
