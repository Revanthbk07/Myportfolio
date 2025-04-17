'use strict';

// Toggle helper
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// Modal activation
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

testimonialsItem.forEach(item => {
  item.addEventListener('click', function () {
    if (modalImg && modalTitle && modalText) {
      const avatar = this.querySelector('[data-testimonials-avatar]');
      const title = this.querySelector('[data-testimonials-title]');
      const text = this.querySelector('[data-testimonials-text]');

      if (avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }

      if (title) modalTitle.innerHTML = title.innerHTML;
      if (text) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    }
  });
});

if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener('click', testimonialsModalFunc);
  overlay.addEventListener('click', testimonialsModalFunc);
}

// Filter select
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (select) {
  select.addEventListener('click', function () {
    elementToggleFunc(select);
  });
}

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category;
    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

selectItems.forEach(item => {
  item.addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter button functionality (for larger screens)
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
});

// Contact form validation
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
  input.addEventListener('input', function () {
    if (form && formBtn) {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    }
  });
});

// Page navigation (safe)
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(navLink => {
  navLink.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent 404-causing reload

    const clickedPage = this.innerHTML.toLowerCase();

    pages.forEach((page, index) => {
      if (clickedPage === page.dataset.page) {
        page.classList.add('active');
        navigationLinks[index].classList.add('active');
        window.scrollTo(0, 0);
      } else {
        page.classList.remove('active');
        navigationLinks[index].classList.remove('active');
      }
    });
  });
});
