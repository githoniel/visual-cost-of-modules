import React from 'react'
import { actions, smart } from '@gem-mine/durex'
import style from './style/index.module.less'

@smart(
  (state) => ({
    count: state.demo.count
  }),
  () => ({
    increment(): void {
      actions.demo.change(1)
    },
    decrement(): void {
      actions.demo.change(-1)
    }
  })
)
class Counter extends React.Component<{
    count: number;
    increment: () => void;
    decrement: () => void;
  }> {
  render(): JSX.Element {
    const { props } = this

    return (
      <div className={style.counter}>
        <div className={`${style['counter-number']} ${props.count > 10 ? style.highlight : ''}`}>{props.count}</div>
        <div className={style['counter-buttons']}>
          <button onClick={props.decrement} className={`${style.button} ${style['counter-button']}`}>
            减少
          </button>
          <button onClick={props.increment} className={`${style.button} ${style['counter-button']}`}>
            增加
          </button>
        </div>
      </div>
    )
  }
}

export default Counter
