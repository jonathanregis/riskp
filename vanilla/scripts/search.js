function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  
  function hideList() {
      const resultsDiv = document.getElementById('searchResults');
      if (resultsDiv) {
        resultsDiv.classList.add('hidden');
      }
  }
  
  function inputChange(inputElement) {
    const term = inputElement.value;
    const showList = term !== '';
  
    if (showList) {
        inputElement.parentElement.classList.remove("rounded-b-lg")
        const foundResults = simulateSearch(term); // Simulate search functionality
        displayResults(foundResults, term);
    } else {
        inputElement.parentElement.classList.add("rounded-b-lg")
        hideList();
    }
  }
  
  function simulateSearch(term) {
    const tokens = [
      { id: 'ETH' },
      { id: 'BTC' },
      // Include other token objects here
    ];
  
    const found = tokens.filter(x => x.id.toLowerCase().includes(term.toLowerCase()));
    return found;
  }
  
  function displayResults(results, term) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.classList.remove('hidden');
    if (resultsDiv) {
      resultsDiv.innerHTML = '';
  
      if (results.length === 0) {
        resultsDiv.innerHTML = `<p role="listitem">No results found for "${term}"</p>`;
      } else {
        const ul = document.createElement('ul');
        results.forEach(result => {
          const li = document.createElement('li');
          li.classList.add('p-2', 'my-2');
          const link = document.createElement('a');
          link.href = `/trade/${result.id}-USD`;
          link.textContent = result.id;
          li.appendChild(link);
          ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
      }
    }
  }
  