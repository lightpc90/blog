import React from 'react'

const EmailSpliting = (email) => {
    const [name] = email.split('@')
  return name
}

export default EmailSpliting