  // Tab navigation logic
  const tabs = document.querySelectorAll('nav button');
  const sections = document.querySelectorAll('main section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs and sections
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      sections.forEach(sec => sec.classList.remove('active'));

      // Activate clicked tab & related section
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const id = tab.getAttribute('data-tab') + '-section';
      document.getElementById(id).classList.add('active');
    });
  });

  // Dynamic Dropdown Data
  const countries = [
    "India",
    "United States",
    "Canada",
    "Australia",
    "Finland",
    "Indonesia",
    "England",
    "Ireland",
    "Iceland",
    "New Zealand",
    "South Africa",
    "Argentina"
  ];

  const dropdownSearch = document.getElementById('dropdown-search');
  const dropdownList = document.getElementById('dropdown-list');

  dropdownSearch.addEventListener('input', () => {
    const input = dropdownSearch.value.trim().toLowerCase();
    dropdownList.innerHTML = '';

    if(input === '') {
      dropdownList.style.display = 'none';
      return;
    }

    const filtered = countries.filter(c =>
      c.toLowerCase().includes(input)
    );

    if(filtered.length === 0) {
      dropdownList.innerHTML = '<div>No matches found</div>';
    } else {
      filtered.forEach(country => {
        const div = document.createElement('div');
        div.textContent = country;
        div.setAttribute('data-test-id', 'option-' + country.toLowerCase().replace(/\s+/g, '-'));
        div.tabIndex = 0;
        div.addEventListener('click', () => {
          dropdownSearch.value = country;
          dropdownList.style.display = 'none';
        });
        dropdownList.appendChild(div);
      });
    }
    dropdownList.style.display = 'block';
  });

  // Modal logic
  const modalOverlay = document.getElementById('modal-overlay');
  const openModalBtn = document.getElementById('open-modal');
  const closeModalBtn = document.getElementById('close-modal');

  openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });
  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
  modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Table sorting logic
  const tableBody = document.getElementById('table-body');
  const headers = document.querySelectorAll('th[data-sort-key]');
  let sortDirection = {};

  headers.forEach(header => {
    sortDirection[header.dataset.sortKey] = 'asc';

    header.addEventListener('click', () => {
      const key = header.dataset.sortKey;
      const rows = Array.from(tableBody.rows);

      rows.sort((a, b) => {
        let aText = a.querySelector(`[data-test-id^="cell-${key}"]`).textContent.trim();
        let bText = b.querySelector(`[data-test-id^="cell-${key}"]`).textContent.trim();

        if(key === 'age') {
          return sortDirection[key] === 'asc' ? aText - bText : bText - aText;
        } else {
          if(aText < bText) return sortDirection[key] === 'asc' ? -1 : 1;
          if(aText > bText) return sortDirection[key] === 'asc' ? 1 : -1;
          return 0;
        }
      });

      // Toggle direction
      sortDirection[key] = sortDirection[key] === 'asc' ? 'desc' : 'asc';

      // Append sorted rows
      rows.forEach(row => tableBody.appendChild(row));
    });

    // Enable keyboard sorting on Enter or Space key
    header.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Toast notification logic
  const toast = document.getElementById('toast');
  const showToastBtn = document.getElementById('show-toast');

  showToastBtn.addEventListener('click', () => {
    toast.textContent = 'This is a toast notification!';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  });

  // Form submission
  const practiceForm = document.getElementById('practice-form');
  practiceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    practiceForm.reset();
  });

  // Open in new tab
document.getElementById('open-tab').addEventListener('click', () => {
  window.open('https://example.com', '_blank');
});

// Open in new window
document.getElementById('open-window').addEventListener('click', () => {
  window.open('https://example.com', '_blank', 'width=600,height=400');
});
