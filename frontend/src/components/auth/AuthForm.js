import React from 'react'

export default ({nicknameHeader, passwordHeader, submitHandler, redirectBlock}) => (
  <form>
    <div>
      <input type="text" name="nickname"/>
      <input type="password" name="password"/>
    </div>
    <div>
      <button type="button">Go!</button>
      {redirectBlock}
    </div>
  </form>
)
