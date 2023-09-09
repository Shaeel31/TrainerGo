import React, { FC } from 'react'
import AuthLayout from './default'
import DashboardLayout from './dashboard'

const layouts = {
  auth: AuthLayout,
  dashboard: DashboardLayout,
}

const LayoutWrapper: FC<any> = (props) => {
  // to get the text value of the assigned layout of each component
  const Layout = layouts[props.children.type.layout]
  // if we have a registered layout render children with said layout
  if (Layout != null) return <Layout {...props}>{props.children}</Layout>
  // if not render children with fragment
  return <AuthLayout {...props}>{props.children}</AuthLayout>
}

export default LayoutWrapper
