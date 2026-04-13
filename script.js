/* ================================================================
   Prestige Estates — Frontend Script v1.7.3
   Build: prod-2024-11-03T14:22:08Z
   ================================================================
   NOTE: Debug session active. Memory dump saved.
   ================================================================ */

var _cfg = {
  api: "https://api.prestige-estates.in/v2",
  env: "production",
  dbg: false
};

// Session metadata — injected by backend pipeline
// Anomaly detected: unauthorized commit by gh0stb1t3 on 2024-10-31
var _session = {
  uid: "USR_4829104",
  region: "south-india",
  pipe_author: atob('Z2gwc3RiMXQz'),       // base64 → hacker name
  _loc: ["Kol", "kata"].join("") + ", India"  // hidden location — split to avoid grep
};

let currentPoints = 50;

// ================================================================

document.addEventListener('DOMContentLoaded', function () {

  
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

    const pointsValueDisplay = document.getElementById('points-value');
  const pointsAnimContainer = document.getElementById('points-anim-container');

  function updatePointsDisplay(amount) {
    // Basic counter animation
    const startValue = parseInt(pointsValueDisplay.textContent);
    const endValue = currentPoints;
    const duration = 1000;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(startValue + (endValue - startValue) * eased);
      pointsValueDisplay.textContent = val;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    if (amount) {
      showPointDeduction(amount);
    }
  }

  function showPointDeduction(amount) {
    const el = document.createElement('div');
    el.className = 'points-deduction';
    el.textContent = '-' + amount;
    pointsAnimContainer.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function deductPoints(amount) {
    if (currentPoints <= 0) return;
    currentPoints = Math.max(0, currentPoints - amount);
    updatePointsDisplay(amount);
  }

  const hintBtn = document.getElementById('hint-btn');
  const confirmOverlay = document.getElementById('confirm-modal');
  const hintOverlay = document.getElementById('hint-modal');
  const btnYes = document.getElementById('modal-yes');
  const btnNo = document.getElementById('modal-no');
  const hintClose = document.getElementById('hint-close');

  hintBtn.addEventListener('click', function () {
    confirmOverlay.classList.add('active');
  });

  btnNo.addEventListener('click', function () {
    confirmOverlay.classList.remove('active');
  });

  confirmOverlay.addEventListener('click', function (e) {
    if (e.target === confirmOverlay) confirmOverlay.classList.remove('active');
  });

  btnYes.addEventListener('click', function () {
    confirmOverlay.classList.remove('active');
    // Deduct points for hint
    deductPoints(20);
    setTimeout(function () {
      hintOverlay.classList.add('active');
    }, 200);
  });

  hintClose.addEventListener('click', function () {
    hintOverlay.classList.remove('active');
  });

  hintOverlay.addEventListener('click', function (e) {
    if (e.target === hintOverlay) hintOverlay.classList.remove('active');
  });


  const CORRECT_NAME     = 'gh0stb1t3';
  const CORRECT_LOCATION = 'kolkata, india';
  const FREE_ATTEMPTS    = 5;
  const PENALTY_PTS      = 5;

  let attemptCount = 0;
  let solved = false;

  const answerBtn    = document.getElementById('answer-btn');
  const answerModal  = document.getElementById('answer-modal');
  const answerClose  = document.getElementById('answer-close');
  const answerSubmit = document.getElementById('answer-submit');
  const ansName      = document.getElementById('ans-name');
  const ansLocation  = document.getElementById('ans-location');
  const feedback     = document.getElementById('answer-feedback');
  const attemptInfo  = document.getElementById('attempt-info');
  const dots         = document.querySelectorAll('.dot');

  
  answerBtn.addEventListener('click', function () {
    answerModal.classList.add('active');
    ansName.focus();
  });


  answerClose.addEventListener('click', function () {
    answerModal.classList.remove('active');
  });

  answerModal.addEventListener('click', function (e) {
    if (e.target === answerModal) answerModal.classList.remove('active');
  });

  
  function updateDots() {
    dots.forEach(function (dot, i) {
      dot.className = 'dot';
      if (i < attemptCount && i < FREE_ATTEMPTS) {
        dot.classList.add('dot-used');
      } else if (i < FREE_ATTEMPTS) {
        dot.classList.add('dot-free');
      } else {
        dot.classList.add('dot-empty');
      }
    });
  }

  
  function updateAttemptInfo() {
    if (solved) {
      attemptInfo.innerHTML = '<strong style="color:#155724">✓ Solved successfully!</strong>';
      return;
    }
    const remaining = Math.max(0, FREE_ATTEMPTS - attemptCount);
    if (attemptCount < FREE_ATTEMPTS) {
      attemptInfo.innerHTML =
        '<strong>' + remaining + '</strong> free attempt' + (remaining !== 1 ? 's' : '') + ' remaining';
    } else {
      const penalty = (attemptCount - FREE_ATTEMPTS) * PENALTY_PTS;
      attemptInfo.innerHTML =
        'No free attempts left — each try costs <strong>' + PENALTY_PTS + ' pts</strong>' +
        (penalty > 0 ? ' · Total penalty so far: <strong style="color:#c0392b">−' + penalty + ' pts</strong>' : '');
    }
  }

  function showFeedback(type, message) {
    feedback.style.display = 'block';
    feedback.className = 'answer-feedback ' + type;
    feedback.innerHTML = message;
  }

  function shakeInput(el) {
    el.classList.remove('input-error');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('input-error');
    setTimeout(function () { el.classList.remove('input-error'); }, 400);
  }

  answerSubmit.addEventListener('click', function () {
    if (solved) return;

    const nameVal = ansName.value.trim().toLowerCase();
    const locVal  = ansLocation.value.trim().toLowerCase();

   
    if (!nameVal && !locVal) {
      showFeedback('feedback-error', '⚠️ Please enter both the hacker name and location.');
      shakeInput(ansName);
      shakeInput(ansLocation);
      return;
    }

    attemptCount++;
    updateDots();

    const nameCorrect = nameVal === CORRECT_NAME;
    const locCorrect  = locVal === CORRECT_LOCATION;

    if (nameCorrect && locCorrect) {
      
      solved = true;
      updateAttemptInfo();
      ansName.classList.remove('input-error');
      ansLocation.classList.remove('input-error');
      ansName.classList.add('input-success');
      ansLocation.classList.add('input-success');
      answerSubmit.disabled = true;
      answerSubmit.textContent = '✓ Solved!';
      answerSubmit.style.background = '#2d7a2d';
      answerSubmit.style.cursor = 'default';
      showFeedback('feedback-solved',
        '[ ACCESS GRANTED ]\n\n' +
        '✓ Hacker Name  : gh0stb1t3\n' +
        '✓ Location     : Kolkata, India\n\n' +
        'Challenge complete! 🎉'
      );
    } else {
     
      if (!nameCorrect) shakeInput(ansName);
      if (!locCorrect)  shakeInput(ansLocation);

      // Build partial-correct hint
      let partialHint = '';
      if (nameCorrect && !locCorrect) partialHint = ' Name is correct ✓ — the location is wrong.';
      else if (!nameCorrect && locCorrect) partialHint = ' Location is correct ✓ — the name is wrong.';

      if (attemptCount < FREE_ATTEMPTS) {
        const left = FREE_ATTEMPTS - attemptCount;
        showFeedback('feedback-error',
          '❌ Incorrect answer.' + partialHint +
          ' <strong>' + left + '</strong> free attempt' + (left !== 1 ? 's' : '') + ' remaining.'
        );
      } else if (attemptCount === FREE_ATTEMPTS) {
        showFeedback('feedback-penalty',
          '⚠️ Last free attempt used!' + (partialHint || ' Both answers are wrong.') +
          ' <br>From now, each attempt costs <strong>' + PENALTY_PTS + ' points</strong>.'
        );
      } else {
        const penaltyValue = PENALTY_PTS;
        deductPoints(penaltyValue);
        const totalPenaltyText = (attemptCount - FREE_ATTEMPTS) * PENALTY_PTS;
        showFeedback('feedback-penalty',
          '⚡ Wrong answer.' + partialHint +
          ' Penalty deducted: <strong>−' + penaltyValue + ' pts</strong> · Total: <strong style="color:#c0392b">−' + totalPenaltyText + ' pts</strong>.'
        );
      }
      updateAttemptInfo();
    }
  });

   [ansName, ansLocation].forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') answerSubmit.click();
    });
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

    document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

   const enquireForm = document.getElementById('enquire-form');
  if (enquireForm) {
    enquireForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = enquireForm.querySelector('button');
      btn.textContent = '✓ Request Sent';
      btn.style.background = '#2d7a2d';
      setTimeout(() => {
        btn.textContent = 'Enquire Now';
        btn.style.background = '';
        enquireForm.reset();
      }, 3000);
    });
  }

});
