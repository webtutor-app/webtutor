import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'
import { withNamespaces } from 'react-i18next'
import { useGoogleLogout } from 'react-google-login'

// users
import user1 from '../../../assets/images/users/avatar-1.jpg'

const ProfileMenu = (props) => {
    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false)

    const [username, setusername] = useState('Admin')
    const [imageUrl, setImageUrl] = useState(user1)

    useEffect(() => {
        if (localStorage.getItem('authUser')) {
            if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
                const obj = JSON.parse(localStorage.getItem('authUser'))
                setusername(obj.displayName)
            } else if (process.env.REACT_APP_DEFAULTAUTH === 'fake' || process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
                const obj = JSON.parse(localStorage.getItem('authUser'))
                setusername(obj.givenName)
                setImageUrl(obj.imageUrl)
            }
        }
    }, [props.success])

    const onLogoutSuccess = () => {
        props.history.push('/')
    }

    const { signOut, loaded } = useGoogleLogout({
        clientId: '173892898030-lqdnujddqgv4j5kloa94lkmdsssfale5.apps.googleusercontent.com',
        uxMode: 'redirect',
        onLogoutSuccess,
    })

    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
                <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                    <img className="rounded-circle header-profile-user" src={imageUrl} alt={username} />
                    <span className="d-none d-xl-inline-block ml-2 mr-1">{username}</span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <Link className="dropdown-item" to="/profile">
                        <i className="bx bx-user font-size-16 align-middle mr-1"></i>
                        {props.t('Profile')}
                    </Link>
                    <Link className="dropdown-item" to="/wallet">
                        <i className="bx bx-wallet font-size-16 align-middle mr-1"></i>
                        {props.t('Wallet')}
                    </Link>
                    <Link className="dropdown-item" to="/edit-profile">
                        <i className="bx bx-cog font-size-16 align-middle mr-1"></i>
                        {props.t('Settings')}
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link onClick={signOut} className="dropdown-item btn-primary" to="#">
                        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                        <span>{props.t('Logout')}</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

const mapStatetoProps = (state) => {
    const { error, success } = state.Profile
    return { error, success }
}

export default withRouter(connect(mapStatetoProps, {})(withNamespaces()(ProfileMenu)))
