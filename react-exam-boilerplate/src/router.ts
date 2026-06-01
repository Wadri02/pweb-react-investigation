import { createRootRoute, createRoute, createRouter, Outlet, Link } from '@tanstack/react-router'
import React from 'react'
import { PaginaInicio } from './pages/PaginaInicio'
import { PaginaUsuarios } from './pages/PaginaUsuarios'
import { PaginaDetalle } from './pages/PaginaDetalle'

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 20,
  padding: '12px 24px',
  background: '#1e293b',
  alignItems: 'center',
}

function Root() {
  return React.createElement(
    'div',
    { style: { fontFamily: 'sans-serif', minHeight: '100vh', background: '#f8fafc' } },
    React.createElement(
      'nav',
      { style: navStyle },
      React.createElement(Link, {
        to: '/',
        style: { color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 },
        activeProps: { style: { color: '#60a5fa', fontWeight: 700 } },
      }, 'Inicio'),
      React.createElement(Link, {
        to: '/usuarios',
        style: { color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 },
        activeProps: { style: { color: '#60a5fa', fontWeight: 700 } },
      }, 'Usuarios'),
    ),
    React.createElement(Outlet, null),
  )
}

const rootRoute = createRootRoute({ component: Root })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PaginaInicio,
})

const usuariosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usuarios',
  component: PaginaUsuarios,
})

const usuarioDetalleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/usuarios/$userId',
  component: PaginaDetalle,
})

const routeTree = rootRoute.addChildren([indexRoute, usuariosRoute, usuarioDetalleRoute])

export const router = createRouter({ routeTree })

export type Router = typeof router
