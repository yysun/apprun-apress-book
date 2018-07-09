import app, { Component } from 'apprun';

export default class FabComponent extends Component {
  view = (state) => {
    const style = {
      'left': `${state.position.x}px`,
      'top': `${state.position.y}px`,
    };

    return <div className='fab-btn' style={style}
      onpointerdown={e => this.run('drag', e)}
      onpointermove={e => this.run('move', e)}
      onpointerup={e => this.run('drop', e)}> + </div>
  };

  update = {
    drag: (state, e) => ({
      ...state,
      dragging: true,
      start: { x: e.pageX, y: e.pageY },
      last: { x: e.pageX, y: e.pageY }
    }),
    move: (state, e) => {
      if (!state.dragging) return;
      e.target.setPointerCapture(e.pointerId);
      const last = { x: e.pageX, y: e.pageY }
      const position = {
        x: state.position.x + e.pageX - state.last.x,
        y: state.position.y + e.pageY - state.last.y
      }
      return ({ ...state, position, last })
    },
    drop: (state, e) => {
      if (state.last.x - state.start.x === 0 &&
        state.last.y - state.start.y === 0) state.onClick();
      e.target.releasePointerCapture(e.pointerId);
      return { ...state, dragging: false };
    }
  }
}

