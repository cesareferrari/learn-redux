export const UPDATE_TITLE = 'UPDATE_TITLE';

export const updateTitle = title => {
  console.log(title);

  return {
    type: UPDATE_TITLE,
    payload: title
  }
}
