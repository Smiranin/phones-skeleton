'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const phoneContainer = document.querySelector('#root');
    const phonesSearch = document.querySelector('.search-form');

    let topFive = 5;
    const initPhones = (phones) => {
        phones.forEach(element => {
            let description = element.snippet.substring(0, 90);
            description += '. . .';
            const item = document.createElement('div');
            item.classList.add('container-fluid', 'shadow-lg', 'p-3', 'mb-5', 'm-5', 'rounded', 'bg-dark', 'h-auto', 'text-white', 'row', 'align-items-center', 'phone');
            const left_col = document.createElement('div');
            left_col.classList.add('col-3');
            const right_col = document.createElement('div');
            right_col.classList.add('col-6');
            const phoneImage = document.createElement('img');
            phoneImage.src = element.imageUrl;
            phoneImage.alt = `${element.name}`;
            phoneImage.classList.add('rounded', 'phone-image', 'object-fit-contain');
            left_col.append(phoneImage);
            const newSpan = document.createElement('span');
            newSpan.textContent = 'New';
            newSpan.classList.add('badge', 'text-bg-success')
            const phoneName = document.createElement('h5');
            phoneName.textContent = element.name;
            if (topFive > 0) {
                phoneName.append(newSpan);
                topFive -= 1;
            }
            const phoneDesc = document.createElement('p');
            phoneDesc.classList.add('text-center', 'col');
            phoneDesc.textContent = `${description}`;
            right_col.append(phoneName, phoneDesc);
            item.append(left_col, right_col);
            phoneContainer.append(item);
    
        });
    };
    initPhones(phones);


    const phones_object = document.querySelectorAll('.phone');
    let phone_list = [];
    function search() { 
        let input = document.getElementById('searchbar').value 
        input=input.toLowerCase(); 
        let x = document.getElementsByClassName('animals'); 
          
        for (i = 0; i < x.length; i++) {  
            if (!x[i].innerHTML.toLowerCase().includes(input)) { 
                x[i].style.display="none"; 
            } 
            else { 
                x[i].style.display="list-item";                  
            } 
        } 
    } 

    phonesSearch.addEventListener('keyup', () => {
        phone_list = [];
        phoneContainer.innerHTML = '';
        phones.forEach(item => {
            let input = phonesSearch.value;
            input = input.toLowerCase();
            let snippet = item.snippet.toLowerCase();
            if (!snippet.includes(input)) {
                phone_list += item;
            }
        });
        initPhones(phone_list);
    });

});