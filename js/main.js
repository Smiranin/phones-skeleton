'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const phoneContainer = document.querySelector('#root');

    phones.forEach(element => {
        let description = element.snippet.substring(0, 90);
        description += '. . .';
        const item = document.createElement('div');
        item.classList.add('container-fluid', 'shadow-lg', 'p-3', 'mb-5', 'm-5', 'rounded', 'bg-dark', 'h-auto', 'text-white', 'row', 'align-items-center');
        const left_col = document.createElement('div');
        left_col.classList.add('col-3');
        const right_col = document.createElement('div');
        right_col.classList.add('col-6', 'align-items-center');
        const phoneImage = document.createElement('img');
        phoneImage.src = element.imageUrl;
        phoneImage.alt = `${element.name}`;
        phoneImage.classList.add('rounded', 'phone-image', 'object-fit-contain');
        left_col.append(phoneImage);
        const phoneName = document.createElement('h5');
        phoneName.textContent = element.name;
        const phoneDesc = document.createElement('p');
        phoneDesc.classList.add('text-center', 'col');
        phoneDesc.textContent = `${description}`;
        right_col.append(phoneName, phoneDesc);
        item.append(left_col, right_col)
        phoneContainer.append(item);

    });
});