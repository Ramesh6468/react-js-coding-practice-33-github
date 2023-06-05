import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_preview: 'IN_PREVIEW',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    status: statusList.initial,
    repositoryData: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {activeId} = this.state
    this.setState({status: statusList.in_preview})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      console.log(updatedData)
      this.setState({repositoryData: updatedData, status: statusList.success})
    } else {
      this.setState({status: statusList.failure})
    }
  }

  getSuccessStatus = () => {
    const {repositoryData} = this.state
    return (
      <ul className="statusContainer1">
        {repositoryData.map(each => (
          <RepositoryItem key={each.id} repositoryDetails={each} />
        ))}
      </ul>
    )
  }

  getFailureStatus = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="image1"
        alt="failure view"
      />
      <h1 className="error">Something Went Wrong</h1>
    </div>
  )

  getPreviewStatus = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  setActiveLanguage = id => {
    this.setState({activeId: id}, this.getItems)
  }

  getRepositoriesList = () => {
    const {status} = this.state
    switch (status) {
      case statusList.success:
        return this.getSuccessStatus()
      case statusList.failure:
        return this.getFailureStatus()
      case statusList.in_preview:
        return this.getPreviewStatus()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="bgContainer">
        <h1 className="title">Popular</h1>
        <ul className="itemContainer">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              itemList={each}
              isActive={each.id === activeId}
              setActiveLanguage={this.setActiveLanguage}
            />
          ))}
        </ul>
        {this.getRepositoriesList()}
      </div>
    )
  }
}

export default GithubPopularRepos
