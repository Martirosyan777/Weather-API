{
  const modal = document.querySelector('.modal');
  const openModalButton = document.querySelector('.add-location');
  const closeModalButton = document.querySelector('.close-modal');

  function openModal() {
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  openModalButton.onclick = openModal;
  closeModalButton.onclick = closeModal;
}