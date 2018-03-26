import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, selectWord} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import './GameDetails.css'
import './Style.css'

class GameDetails extends PureComponent {
  static propTypes = {
    joinGame: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  createButton = (word) => {
    return <button
      key={`${word}`}
      type='button'
      className="button"
      onClick={() => this.props.selectWord(this.props.game.id)}
    >{word}</button>
  }

  render() {
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)
    console.log(game.players)

    return (
      <Paper class="outer-paper">
          <h1>Game #{game.id}</h1>

          <p>Status: {game.status}</p>

          {
            game.status === 'started' &&
            <div>Its your turn!</div>
          }

          {
            game.status === 'pending' &&
            <button onClick={this.joinGame}>Join Game</button>
          }

          <hr />
          <div clasName="Board">
            {
              game.status === 'started' &&
              player.board.map(word => this.createButton(word))
            }
          </div>
          <div className="turn">
            Pick this word: { game.turn }
          </div>
      </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, selectWord
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
