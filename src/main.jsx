import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './style.css'
import AppLayout from './ui/AppLayout.jsx'
import JobsPage from './views/JobsPage.jsx'
import JobDetailPage from './views/JobDetailPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <JobsPage /> },
      { path: 'job/:jobId', element: <JobDetailPage /> },
    ],
  },
], {
  basename: '/eu-scraper-ui'
})

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)



