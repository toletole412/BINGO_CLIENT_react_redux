import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/users'
import {Redirect} from 'react-router-dom'


class LogoutPage extends PureComponent {
  componentWillMount() {
    this.props.logout()
  }  //이거 해석 제대로 못하는 중

  render() {
    if (!this.props.currentUser) return (
      <Redirect to="/" /> // /가 어딘지 파악하자
    )

    return (
      <div>
        <h1>Logging out...</h1>
      </div>
    )
  }


}
const mapStateToProps = state => ({
  authenticated: state.currentUser !== null
}) // authenticated 는 어디서 오는거지?

export default connect(mapStateToProps, {logout})(LogoutPage)
