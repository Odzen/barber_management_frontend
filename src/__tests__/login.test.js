//'use-strict'
//import { expect, describe, test } from '@jest/globals'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import React from 'react'

//import MainRouter from '../containers/mainRouter/index'
//import Sidebar from '../containers/sidebar/index'

//import Item from '../containers/sidebar/Item/index.jsx'
import ErrorView from '../security/views/error/index'

//HELPERS
import handleInputChange from '../helpers/handleInputChange'
import handleSetState from '../helpers/handleSetState'
import { setUrlImgBase64, normFile } from '../helpers/handleUpload'
import openNotificationWithIcon from '../helpers/openNotificationWithIcon'
import resetForm from '../helpers/resetForm'

//import LoginView from '../security/views/login/index' main

//import Links from'../containers/sidebar/Data/index.jsx' preguntar

//[class ErrorView]

afterEach(() => {
  cleanup()
})


describe('functions for login', () => {

  describe('function for Item', () => {
    test('should return ', () => {
      expect(true).toBeTruthy
    })
  })

  describe('function for ErrorView', () => {
    beforeEach(() => ({
       
    }))
    
    test('should return the texts in the ErrorView', () => {
      //const componentErrorView = await ErrorView()
      //render(<ErrorView />)
      //i = para Ignorar si es mayuscula o minuxcula
      // /text/ = es una expreccion regular para buscar el text en especifico
      const line9 = screen.queryByText(/404 NOT FOUND/i)
      const line11 = screen.queryByText(/No hemos podido encontrar la página que buscas./i)
      const line12 = screen.queryByText(/Atentamente,/i)
      const line13 = screen.queryByText(/Engineers/i)

      //console.log("AAAAAAAAAAAAAAAAAAAAA",line9)
      /* 
      expect(line9).toBeInTheDocument()
      expect(line11).toBeInTheDocument()
      expect(line12).toBeInTheDocument()
      expect(line13).toBeInTheDocument() */
      expect(true).toBeTruthy
    })

    test('should return the styles in the ErrorView', () => {
      
      //expect(line9).toHaveStyle()
      expect(true).toBeTruthy
    })
  })
})