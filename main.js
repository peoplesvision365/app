class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.circle = document.createElement('div');
        this.circle.style.width = '50px';
        this.circle.style.height = '50px';
        this.circle.style.borderRadius = '50%';
        this.circle.style.display = 'flex';
        this.circle.style.justifyContent = 'center';
        this.circle.style.alignItems = 'center';
        this.circle.style.fontSize = '1.5rem';
        this.circle.style.fontWeight = 'bold';
        this.circle.style.color = 'white';

        shadow.appendChild(this.circle);
    }

    static get observedAttributes() {
        return ['number', 'color'];
    }

    connectedCallback() {
        this.updateBall();
    }

    attributeChangedCallback() {
        this.updateBall();
    }

    updateBall() {
        const number = this.getAttribute('number');
        const color = this.getAttribute('color');
        this.circle.style.backgroundColor = color || '#888';
        this.circle.textContent = number || '';
    }
}

customElements.define('lotto-ball', LottoBall);

const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');
const themeButtons = document.querySelectorAll('.theme-btn');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeButtons.forEach((button) => {
        button.setAttribute('aria-pressed', button.dataset.theme === theme ? 'true' : 'false');
    });
}

function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
        return;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
}

function generateLottoNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const numbers = pool.slice(0, 6);

    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];

    numbers.forEach((number, index) => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoBall.setAttribute('color', colors[index % colors.length]);
        lottoNumbersContainer.appendChild(lottoBall);
    });
}

generateBtn.addEventListener('click', generateLottoNumbers);
themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setTheme(button.dataset.theme);
    });
});

// Initial generation
initTheme();
generateLottoNumbers();
