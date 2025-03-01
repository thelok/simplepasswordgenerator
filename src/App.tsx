import { ClipboardBulletListRegular } from '@fluentui/react-icons'
import './App.css'
import { PasswordGenerator } from './passwordGenerator/PasswordGenerator'
import { PasswordGeneratorForm } from './passwordGenerator/PasswordGeneratorForm'
import { UsageReasons } from './UsageReasons'

/**
 * The main application component for the Simple Password Generator.
 * 
 * This component renders the entire UI for the password generator application.
 * It includes the main title, description, password generator form, and other
 * related components.
 * 
 * @returns {JSX.Element} The rendered application component.
 */
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

              View the source: <a href="https://github.com/thelok/simplepasswordgenerator">https://github.com/thelok/simplepasswordgenerator</a>
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
