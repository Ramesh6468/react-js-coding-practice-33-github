// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="resultContainer">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="heading">{name}</h1>
      <div className="starsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p className="count">{starsCount}</p>
        <p className="indi">Stars</p>
      </div>
      <div className="starsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        <p className="count">{forksCount}</p>
        <p className="indi">Stars</p>
      </div>
      <div className="starsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo"
        />
        <p className="count">{issuesCount}</p>
        <p className="indi">Stars</p>
      </div>
    </li>
  )
}

export default RepositoryItem
