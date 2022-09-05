import React from 'react'

export default function Overlay({ loaded, clicked }) {
  return (
    <>
      <div style={{ position: 'fixed', bottom: '80px' }}>
        <div
          className={`fullscreen bg ${loaded ? 'ready' : 'notready'} ${
            clicked && 'clicked'
          }`}
        >
          f
        </div>
        {/* <Footer
          date="28. January"
          year="2021"
          link1={<a href="https://github.com/pmndrs/drei">pmndrs/drei</a>}
          link2={<a href="https://codesandbox.io/s/drei-reflector-bfplr">s/drei-reflector-bfplr</a>}
        /> */}
      </div>
    </>
  )
}
