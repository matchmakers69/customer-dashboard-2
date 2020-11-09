export default () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  global.document.body.append(modalRoot);
};
