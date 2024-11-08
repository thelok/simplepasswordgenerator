import { ClipboardBulletListRegular } from '@fluentui/react-icons'
import './App.css'
import { PasswordGenerator } from './passwordGenerator/PasswordGenerator'
import { PasswordGeneratorForm } from './passwordGenerator/PasswordGeneratorForm'
import { UsageReasons } from './UsageReasons'

export const App = () => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div className='main-content'>
          <h1 className='main-title'>Simple Password Generator</h1>
          <div className='main-description'>
            <div>
              A simple password generator. Passwords are generated entirely in your web browser.
              We do not know the passwords that are generated and we do not store any passwords.
            </div>
            <div>
              Configure your password settings and hit the <b><code>Generate</code></b> button.
            </div>
            <div>
              Click the <ClipboardBulletListRegular style={{ fontSize: "24px" }} /> icon to copy the password to your clipboard.
            </div>
          </div>
          <PasswordGeneratorForm />
        </div>
        <PasswordGenerator />
        <UsageReasons />
        <div>© 2024 Simple Password Generator. All rights reserved.</div>
      </div>
    </>
  )
}
