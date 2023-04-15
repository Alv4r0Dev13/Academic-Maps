const desc = document.getElementById('desc'),
    charCount = document.getElementById('char-count'),
    maxChar = document.getElementById('max-char');

window.addEventListener('load', () => {
    charCount.innerText = '0';
    maxChar.innerText = ` / ${desc.getAttribute('maxlength')}`;
});

desc.addEventListener('keyup', () => {
    charCount.innerText = desc.value.length;
});