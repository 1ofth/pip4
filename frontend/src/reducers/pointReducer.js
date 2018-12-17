export function pointReducer(state = {x: 0,y: 0,r: 0}, action) {
  switch (action.type) {
    case 'NEW_POINT':
      return {
        x: action.x,
        y: action.y,
        r: action.r
      };

    default:
      return {}
  }
}
