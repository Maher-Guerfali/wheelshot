import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { images } from 'theme'
import { path } from 'utils/const'
import Login from './Login'
import Signup from './Signup'
import videoback from '../../videos/trailer.mp4'
import ResetPassword from './ResetPassword'
import styles from './auth.module.scss'

const Auth = () => (
  <div className={styles.root}>
    <div className={styles.void}> .sss</div>
    <video src={videoback} autoPlay loop muted />

    <div className={styles.leftContainer}>
      <img src={images.profile} className={styles.profile} alt="profile" />
      <h1 className={styles.header}>Welcome To our game</h1>
      <p className={styles.title}>About ?</p>
      <p className={styles.description}>
        An online Escape Room game, where you can play,watch,bet and earn !
      </p>
      <p className={styles.description}>
        ! لعبة غرفة الهروب عبر الإنترنت ، حيث يمكنك اللعب والمشاهدة والمراهنة
        والربح!
      </p>
      <p className={styles.prompt}>
        <a href="mailto:maher.guerfali.com">Maher.Guerfali@gmail.com </a>📧
      </p>
    </div>
    <div className={styles.rightContainer}>
      <Switch>
        <Route path={path.login}>
          <Login />
        </Route>
        <Route path={path.signup}>
          <Signup />
        </Route>
        <Route path={path.resetPassword}>
          <ResetPassword />
        </Route>
        <Redirect to={path.login} />
      </Switch>
    </div>
  </div>
)

export default Auth
