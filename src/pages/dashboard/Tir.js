/* eslint-disable no-void */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import * as THREE from 'three'
import styled from '@emotion/styled'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Reflector,
  Text,
  Plane,
  useTexture,
  useProgress,
  OrbitControls,
} from '@react-three/drei'

import Overlay from './Overlay'

const ScrollDiv = styled.div`
  min-height: 400vh;
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
`

function Card({ position, setVideoLoaded }) {
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: '/drei.mp4',
      crossOrigin: 'Anonymous',
      loop: true,
      muted: true,
    }),
  )
  useEffect(() => void video.play(), [video])

  return (
    <Plane args={[4, 2]} position={position}>
      <meshBasicMaterial toneMapped={false} transparent={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Plane>
  )
}

function Ground(props) {
  const [floor, normal] = useTexture([
    '/SurfaceImperfections003_1K_var1.jpg',
    '/SurfaceImperfections003_1K_Normal.jpg',
  ])
  return (
    <Reflector
      resolution={512}
      args={[20, 10]}
      mirror={0.4}
      mixBlur={8}
      mixStrength={1}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      blur={[400, 100]}
      {...props}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[1, 1]}
          {...props}
        />
      )}
    </Reflector>
  )
}

function Intro({ start, set, scrollProgress }) {
  const [vec] = useState(() => new THREE.Vector3())
  useEffect(() => setTimeout(() => set(true), 500), [])
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(
        vec.set(
          /* state.mouse.x * 5, 3 + state.mouse.y * 2, */ 0,
          0,
          THREE.MathUtils.lerp(16, 0, scrollProgress.current),
        ),
        0.05,
      )
      state.camera.lookAt(0, 0, -2)
    }
  })
}

export default function Tir() {
  const [clicked, setClicked] = useState(true)
  const [ready, setReady] = useState(true)
  const { loaded } = useProgress()
  const scrollProgress = useRef(0)
  const store = { loaded, clicked, setClicked, ready, setReady }

  useEffect(() => {
    const maxScrollY =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const onScroll = (e) => {
      scrollProgress.current =
        e.target.documentElement.scrollTop.toFixed(0) / maxScrollY
      console.log(scrollProgress.current)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollDiv>&nbsp;</ScrollDiv>
      <Canvas
        concurrent
        gl={{ alpha: false }}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 100], fov: 15 }}
        style={{ position: 'fixed' }}
      >
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Card {...store} position={[0, 1.5, 0]} />
            <Ground position={[0, 0, 7]} />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          <Intro start={ready} set={setReady} scrollProgress={scrollProgress} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <Overlay {...store} />
    </>
  )
}
