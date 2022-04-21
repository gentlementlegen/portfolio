import React from 'react'
import style from 'components/animated/Success.module.css'
import clsx from 'clsx'

const Success = (): JSX.Element => {
  return (
    <div style={{ transform: 'scale(0.2) translate(-5px, 10px)' }}>
      <div className={style.check_mark}>
        <div className={clsx(style.saIcon, style.saSuccess, style.animate)}>
          <span className={clsx(style.saLine, style.saTip, style.animateSuccessTip)} />
          <span className={clsx(style.saLine, style.saLong, style.animateSuccessLong)} />
          <div className={style.saPlaceholder} />
          <div className={style.saFix} />
        </div>
      </div>
    </div>
  )
}

export default Success
