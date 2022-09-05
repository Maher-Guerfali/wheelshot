import React from 'react'

import videos from '../../videos/trailer.mp4'

export default function tes() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          top: '50%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate (-50%,  -50%)',
          zIndex: '-1',
        }}
      >
        <source src={videos} type="video/mp4" />
      </video>
    </>
  )
}
