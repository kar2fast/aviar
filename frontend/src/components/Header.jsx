//rfce is shorthand to set up basic elements
import React from 'react' // don't need this done automatically

import { FaSignInAlt, FaSignOutAlt, FaUser, FaSearch } from 'react-icons/fa' // icons
import { GrAdd } from 'react-icons/gr' // icons
import { BsPersonPlusFill, BsCardList, BsFileEarmarkPost } from 'react-icons/bs' // icons

import { useSelector, useDispatch } from 'react-redux' // for logout
import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom' // routing

import { useState } from 'react'
import { toast } from 'react-toastify'

function Header() {
  const [formData, setFormData] = useState({
    search: '', //defaul
  })

  const { search } = formData // the data from search bar

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth) // get before adding search

  const onChange = e => { // changing text in the form seacrh bar
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => { // submitting the search form 
    e.preventDefault()

    const userData = {
      search
    }


    // probbaly set a local storage variable and use it in dashboard


    toast.error("Searched for " + search + "|" + userData.search)

    // dispatch( search function using userData) // not sure if i need to use this or do it all in header.jsx
  }

  const onLogout = () => {
    // logout function
    dispatch(logout()) // needed case in reducer
    dispatch(reset())
    navigate('/')
  }

//!!!!!!!!!!!!!!!!!!!!!!
const id = '623e64b6b128d076a86cf623'
//!!!!!!!!!!!!!!!!!!!!!!

  return (
    <header className='header '>
      <div>
        <Link to='/'>
          <img className='logo' alt="Logo" src="aviarLogo.png" />
        </Link>
      </div>
      <ul>


{/* !!!!!!!!!!!!!!!!! */}
      <li>
        {/* <Link to={{pathname:'/post/'+ id}}>  other way to do it*/}
        <Link to={'/post/' + id}>
          <BsFileEarmarkPost /> 
        </Link>
      </li>

{/* !!!!!!!!!!!!!!!!! */}

        {user ? (
          <>
            <li className='pulseUpload'>
              <Link to='/uploadPost'>
                <GrAdd /> Add Post
              </Link>

            </li>

            <li className='pulseSearch'>
              <form onSubmit={onSubmit}>
                <div  >
                  <button className='search_symbol' type='submit' >
                    <FaSearch />
                  </button >
                  <input
                    className='search'
                    type='search'
                    id='search'
                    name='search'
                    value={search}
                    placeholder='Search...'
                    onChange={onChange}
                  />
                </div>
              </form>

            </li>

            <li className='pulseCollection'>
              <Link to='/myCollections'>
                <BsCardList /> My Collections
              </Link>
            </li>

            <li className='pulseAccount'>
              <Link to='/myAccount'>
                <FaUser /> My Account
              </Link>
            </li>

            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>

          </>
        ) : ( // no user logged in
          <>
            <li>
              <Link to='/login '>
                <FaSignInAlt /> Login
              </Link>
            </li>

            <li>
              <Link to='/register'>
                <BsPersonPlusFill /> Register
              </Link>
            </li>
          </>
        )}

      </ul>
    </header>
  ) // end return
}

export default Header
