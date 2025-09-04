document.addEventListener('DOMContentLoaded', () => {
  // Navbar elements
  const initialLivesEl = document.getElementById('initialLives');
  const coinCountEl = document.getElementById('coinCount');
  const copyCountEl = document.getElementById('copyCount');
  const clearHistoryBtn = document.getElementById('clearHistory');
  const historyList = document.getElementById('historyList');

  // Helper functions for counts
  const getLives = () => parseInt(initialLivesEl?.textContent || '0', 10) || 0;
  const setLives = n => { if (initialLivesEl) initialLivesEl.textContent = String(n); };

  const getCoins = () => parseInt(coinCountEl?.textContent || '0', 10) || 0;
  const setCoins = n => { if (coinCountEl) coinCountEl.textContent = String(n); };

  const getCopyCount = () => parseInt(copyCountEl?.textContent || '0', 10) || 0;
  const setCopyCount = n => { if (copyCountEl) copyCountEl.textContent = String(n); };

  // 4. Heart Icons functionality
  document.querySelectorAll('.lives').forEach(heartIcon => {
    heartIcon.addEventListener('click', function () {
      setLives(getLives() + 1);
      // Optional: change heart icon style on click if desired
      this.classList.remove('fa-regular');
      this.classList.add('fa-solid', 'text-red-500'); // Example: filled red heart
    });
  });

  // Function to copy text to clipboard
  async function copyTextToClipboard(text) {
    if (!text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      return true; // Indicate success
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false; // Indicate failure
    }
  }

  // Challenge Part: Copy Button Functionality
  document.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const card = btn.closest('.bg-white.rounded-xl.border.border-gray-200.shadow-sm');
      const number = card?.querySelector('h2')?.textContent?.trim() || '';

      if (await copyTextToClipboard(number)) {
        setCopyCount(getCopyCount() + 1);
        alert(`'${number}' copied to clipboard!`);
      } else {
        alert('Failed to copy number.');
      }
    });
  });

  // 5. Call Buttons functionality
  document.querySelectorAll('.call').forEach(btn => {
    btn.addEventListener('click', function () {
      const currentCoins = getCoins();
      const callCost = 20;

      if (currentCoins < callCost) {
        alert('Insufficient coins! You need at least 20 coins to make a call.');
        return;
      }

      const card = btn.closest('.bg-white.rounded-xl.border.border-gray-200.shadow-sm');
      const serviceName = card?.querySelector('h1')?.textContent?.trim() || 'Unknown Service';
      const serviceNumber = card?.querySelector('h2')?.textContent?.trim() || 'N/A';

      // Deduct coins
      setCoins(currentCoins - callCost);

      // Show alert
      alert(`Calling ${serviceName} at ${serviceNumber}!`);

      // Add to Call History
      addCallToHistory(serviceName, serviceNumber);
    });
  });

  // 5. Call History Section
  function addCallToHistory(name, number) {
    const callTime = new Date();
    const timeString = callTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const historyItem = document.createElement('div');
    historyItem.className = 'flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg';
    historyItem.innerHTML = `
      <div>
        <p class="font-medium">${name}</p>
        <p class="text-gray-600">${number}</p>
      </div>
      <span class="text-gray-500">${timeString}</span>
    `;
    historyList.prepend(historyItem); // Add new calls to the top
  }

  // Clear History button functionality
  clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
    alert('Call history cleared!');
  });
});