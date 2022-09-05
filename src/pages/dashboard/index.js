/* eslint-disable no-nested-ternary */

import { useDispatch, useSelector } from 'react-redux'
import Button from 'components/Button'
import { actions } from 'slices/app.slice'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { images } from 'theme'
import HoverVideoPlayer from 'react-hover-video-player'

import { TwitchEmbed } from 'react-twitch-embed'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Unity, { UnityContext } from 'react-unity-webgl'
// eslint-disable-next-line spaced-comment
//useState
import Countdown from 'react-countdown'
import React, { Suspense, useRef } from 'react'
import HackerText from 'react-hacker-text'
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

import styles from './dashboard.module.scss'
import PausedOverlay from './PausedOverlay'
import LoadingOverlay from './LoadingOverlay'

import './styles.css'

function Model() {
  const ref = useRef()
  // const snap = useSnapshot(state)
  const { scene } = useGLTF(
    'https://d1a370nemizbjq.cloudfront.net/f8e25565-9091-474b-aed9-67625f51855a.glb',
  )
  scene.position.set(0, -4, 0)
  scene.scale.set(6, 6, 6)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 1.4

    ref.current.rotation.y = Math.cos(t / 2) + 9
  })

  return (
    <group ref={ref} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})

// const cpu="4";
const Dashboard = () => {
  const dispatch = useDispatch()
  const unityContext = new UnityContext({
    loaderUrl: './thhir/Build/thhir.loader.js',
    dataUrl: './thhir/Build/thhir.data',
    frameworkUrl: './thhir/Build/thhir.framework.js',
    codeUrl: './thhir/Build/thhir.wasm',
  })

  const { me } = useSelector((state) => state.app)
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img src={images.profile} className={styles.profile} alt="profile" />

        <h3 className={styles.greeting}>{`Welcome : ${
          me?.fullName || 'User'
        }`}</h3>
        <h1 className={styles.title}>Download our Game now !</h1>
        <p className={styles.description}>
          <div className={styles.req1}>
            <div className={styles.hight}> CPU:</div>
            <div className={styles.gen}>
              Intel Core 2 Duo 2.4 GHz, AMD Athlon X2 2.8 GHz or better
              <div className={styles.yours}>
                <HackerText text=" Yours " />{' '}
                <div>: {navigator.hardwareConcurrency} Cores |</div>{' '}
                <HackerText text="PASS|" />
              </div>
            </div>
          </div>

          <div className={styles.req1}>
            <div className={styles.hight}> RAM:</div>
            <div>4 GB</div>
          </div>

          <div className={styles.req1}>
            <div className={styles.hight}> VIDEO CARD:</div>
            <div>
              512 MB AMD Radeon HD 3870 / NVIDIA GeForce 8800 GT or better
            </div>
          </div>
        </p>

        <div className={styles.buttonContainer}>
          <Button
            label="Download"
            className={`btn-pink-fill ${styles.download}`}
            onClick={() => {
              window.location.href = 'https://gitlab.com/Maher-Guerfali/gata3'
            }}
          />
          <Button
            label="Logout"
            className={`btn-black-outline ${styles.logout}`}
            onClick={() => dispatch(actions.logout())}
          />
        </div>
        <div className={styles.descriptions}>
          This website is protected with hCAPTCHA, and its Politic confidentiel
          and its users conditions are applicable
        </div>
        <div className={styles.left}>
          <div className={styles.logos}>
            <img src={images.spidy} width="200px" height="100px" alt="fef" />
            <img src={images.six} width="75px" height="83px" alt="f" />
            <img src={images.esprit} width="180px" height="60px" alt="ef" />
          </div>
        </div>

        <div className={styles.about}>
          <div className={styles.titlee}>
            <div>About</div>
          </div>
          <div className={styles.ff}>
            GATAA is a thinking game, reflex and teamwork An online multiplayer
            game where each team is made of 4 players locked in a room full of
            puzzles and the goal is sample yet difficult : solve the riddles in
            order to escape before the end of timer ! every room has its unique
            theme and story. the team can find itself in different conditions
            but with one goal : open the door and escape.
          </div>
        </div>

        <div className={styles.rooms}>
          <div className={styles.titlee}>Rooms</div>

          <div className={styles.nextmap}>
            <div>Next map in :</div>
            <Countdown date={Date.now() + 1200000} />

            <img
              src={images.maps}
              width="315px"
              height="213px"
              alt="f"
              className={styles.maps}
            />
          </div>

          <div className={styles.blk}>
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Dentiste</Typography>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? 's' : ''}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <div className={styles.roomdes}>
              A DAILY APPOINTMENT AT THE DENTIST BUT THIS ONE IS NOT LIKE THE
              OTHERS, A WAITING ROOM WITH A QUEUE OF 4 PATIENTS WAITING, YOU
              HAVE BEEN CONSULTING THIS DENTIST FOR TWO YEARS AND THIS IS THE
              FIRST TIME THAT THE SECRETARY HAS BEEN ABSENT.
            </div>
          </div>

          <div className={styles.containerr}>
            <div className={styles.card}>
              <div className={styles.box}>
                <div className={styles.content}>
                  <HoverVideoPlayer
                    style={{
                      width: '400px',
                      height: '320px',
                      // The container should have a set 16:9 aspect ratio
                      // (https://css-tricks.com/aspect-ratio-boxes/)
                    }}
                    videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    pausedOverlay={<PausedOverlay />}
                    loadingOverlay={<LoadingOverlay />}
                    sizingMode="overlay"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.blk}>
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">THE HOSPITAL</Typography>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? 's' : ''}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <div className={styles.roomdes}>
              WORKING AS A NEW NURSE IN A PSYCHIATRIC HOSPITAL, YOU ARE CALLED
              BY THE DIRECTOR TO DISCUSS THE POSITION AND THE REQUIRED TASKS.
            </div>
          </div>

          <div className={styles.containerr}>
            <div className={styles.card}>
              <div className={styles.box}>
                <div className={styles.content}>
                  <HoverVideoPlayer
                    style={{
                      width: '400px',
                      height: '320px',
                      // The container should have a set 16:9 aspect ratio
                      // (https://css-tricks.com/aspect-ratio-boxes/)
                    }}
                    videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                    pausedOverlay={<PausedOverlay />}
                    loadingOverlay={<LoadingOverlay />}
                    sizingMode="overlay"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.blk}>
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Space</Typography>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? 's' : ''}`
                }
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Box>
            <div className={styles.roomdes}>
              You got kidnapped by some random alien dudes, so you find your
              self in a spaceship looking for you way back home, goodluck.
            </div>
          </div>
          <div className={styles.containerr}>
            <div className={styles.card}>
              <div className={styles.box}>
                <div className={styles.content}>
                  <HoverVideoPlayer
                    style={{
                      width: '400px',
                      height: '320px',
                      // The container should have a set 16:9 aspect ratio
                      // (https://css-tricks.com/aspect-ratio-boxes/)
                    }}
                    videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    pausedOverlay={<PausedOverlay />}
                    loadingOverlay={<LoadingOverlay />}
                    sizingMode="overlay"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.Characters}>
          <div className={styles.titlee}>Characters</div>
          <div className={styles.viwers}>
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 30, 0], fov: 50 }}
            >
              <ambientLight intensity={0.7} />
              <spotLight
                intensity={0.1}
                angle={0}
                penumbra={0.2}
                position={[10, 15, 10]}
                castShadow
              />
              <Suspense fallback={null}>
                <Model />

                <Environment preset="city" />
                <ContactShadows
                  rotation-x={Math.PI / 2}
                  position={[0, -0.8, 0]}
                  opacity={0.25}
                  width={100}
                  height={10}
                  blur={1.5}
                  far={0.8}
                />
              </Suspense>
              <OrbitControls
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                enableZoom={false}
                enablePan={false}
              />
            </Canvas>

            <div className={styles.disc}>
              <div>New Skin : Bunny Girl</div>
              <div>You can try this skin before you buy it in browser!</div>
              <Unity
                unityContext={unityContext}
                style={{
                  width: '800px',
                  height: '600px',
                  border: '3px solid red',
                  background: 'green',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stream}>
        <div className={styles.titlee}>Stream</div>
        <div className={styles.midtwitch}>
          <TwitchEmbed
            channel="nb_saiyan"
            id="nb_saiyan"
            theme="dark"
            muted
            onVideoPause={() => console.log(':(')}
          />

          <div className={styles.leader}>
            <div className={styles.leadersc}>Scoreboard</div>

            <div className={styles.players}>
              <div className={styles.badgeAdmin}>
                {me?.fullName || 'User'} Ranking : {me?.Rank || 'User'}
              </div>
              <div className={styles.badge}>Foulen Ranking : 223</div>
              <div className={styles.badge}>Foulena Ranking : 167</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.stream}>
        <div className={styles.titlee}>minting</div>
        <div>
          <div>
            <img src={images.mint} width="700px" height="700px" alt="fef" />
          </div>
        </div>
        <div className={styles.titlee}>
          Developed By Maher Guerfali for donation{' '}
          <a href="https://ko-fi.com/mahergrf">Ko-fi</a>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
