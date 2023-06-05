// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, setActiveLanguage, itemList} = props
  const {id, language} = itemList
  const btnClassName = isActive ? 'button1' : 'button2'

  const onClickButton = () => {
    setActiveLanguage(id)
  }

  return (
    <div className="languageContainer">
      <button className={btnClassName} type="button" onClick={onClickButton}>
        <li className="item">{language}</li>
      </button>
    </div>
  )
}
export default LanguageFilterItem
