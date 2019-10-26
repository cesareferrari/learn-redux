export const UPDATE_TITLE = 'UPDATE_TITLE';
export const TURN_TITLE_GREEN = 'TURN_TITLE_GREEN';

export const updateTitle = title => {
  console.log(title);

  return {
    type: UPDATE_TITLE,
    payload: title
  }
}

export const turnTitleGreen = () => {
  return {
    type: TURN_TITLE_GREEN
  }
}
