import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Typography, Button } from 'antd'
import logo from './logo.svg';
import './style.css'

const { Header, Content, Footer } = Layout

const { Title } = Typography

const LayoutContainer = (props) => {

	// const enableLogoutButton = () => {
	// 	if (authServices.isLoggedIn()) {
	// 		return (
	// 			<Fragment>
	// 				<Button type="danger" id="logout-button" onClick={() => authServices.logout()}>
	// 					<Link to="/login">Cerrar Sesión</Link>
	// 				</Button>
	// 			</Fragment>
	// 		)
	// 	}
	// }

	return (
		<Layout className="layout">
			<Header className="header" style={{ background: "#FFF"}}>
			<div className="flex-container">
				<Title className="main-title" className="header-brand-logo">
					<img src={logo} alt="Keiron Logo" width="100" />
				</Title>		
					{/* {enableLogoutButton()} */}
			</div>
			
			</Header>

			<Content id="content">{props.children}</Content>

			<Footer style={{ textAlign: 'center' }}>Keiron Test ©2020 Creado por Miguelangel Palma</Footer>
		</Layout>
	)
}

export default withRouter(LayoutContainer)
