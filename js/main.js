'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const phoneContainer = document.querySelector('#root');
    const phonesSearch = document.querySelector('#search');
    const body = document.querySelector('body');
    const toggleTheme = document.querySelector('#toggle-theme');
    const sortByOptions = document.querySelectorAll('.sortby-items');
    let phone_names = [];
    let new_phones = [];
    let sortAlphabetically = false;
    let phone_elements = document.querySelectorAll('.phone');
    let currentPhones = [];
    currentPhones = phones;


    toggleTheme.addEventListener('click', () => {
        if (body.getAttribute('data-bs-theme') === 'dark') {
            body.setAttribute('data-bs-theme', 'light');
            toggleTheme.classList.remove('btn-light');
            toggleTheme.classList.add('btn-dark');
        } else {
            body.setAttribute('data-bs-theme', 'dark');
            toggleTheme.classList.remove('btn-dark');
            toggleTheme.classList.add('btn-light');
        }

    });



    // let topFive = 5;
    const initPhones = (phonesList) => {
        phoneContainer.innerHTML = '';
        phonesList.forEach(element => {
            let description = element.snippet.substring(0, 90);
            description += '. . .';
            const item = document.createElement('div');
            item.classList.add('container-fluid', 'shadow-lg', 'p-3', 'mb-5', 'm-5', 'rounded', 'bg-dark', 'h-auto', 'text-white', 'row', 'align-items-center', 'phone');
            item.setAttribute('id', element['age']);
            const left_col = document.createElement('div');
            left_col.classList.add('col-3', 'left_col');
            const right_col = document.createElement('div');
            right_col.classList.add('col-6', 'right_col');
            const phoneImage = document.createElement('img');
            phoneImage.src = element.imageUrl;
            phoneImage.alt = `${element.name}`;
            phoneImage.classList.add('rounded', 'phone-image', 'object-fit-contain', 'phone-image-zoomed');
            left_col.append(phoneImage);
            const newSpan = document.createElement('span');
            newSpan.classList.add('badge')
            const phoneName = document.createElement('h5');
            phoneName.textContent = element.name;
            if (element.age <= 2) {
                newSpan.textContent = 'New';
                newSpan.classList.add('text-bg-light');
                phoneName.append(newSpan);
            } else if (element.age >= 9 && element.age <= 12) {
                newSpan.textContent = 'LTS';
                newSpan.classList.add('text-bg-success');
                phoneName.append(newSpan);
            } else if (element.age > 17) {
                const supportEnd = 2024 - element.age;
                newSpan.textContent = `Support ended on 1/1/${supportEnd}`;
                newSpan.classList.add('text-bg-warning');
                phoneName.append(newSpan);
            }
            const phoneDesc = document.createElement('p');
            phoneDesc.classList.add('text-center', 'col', 'phoneDesc');
            phoneDesc.textContent = `${description}`;
            const badgeName = document.createElement('h5');
            badgeName.classList.add('badgeName')
            right_col.append(phoneName, phoneDesc, badgeName);
            item.append(left_col, right_col);
            phoneContainer.append(item);

            item.addEventListener('click', function() {
                const image = this.querySelector('.phone-image');
                const elementId = Number(this.getAttribute('id'));
                const currentElement = phonesList[elementId];
                const badgeDiv = this.querySelector('.badgeName');
                this.querySelector('.phoneDesc').textContent = `${currentElement['snippet']}`;
                const description = currentElement.snippet.substring(0, 90);
                image.classList.toggle('phone-image-zoomed');
                if (image.classList.contains('phone-image-zoomed')) {
                    image.style.height = '150px';
                    this.querySelector('.phoneDesc').textContent = `${description}. . .`;
                    badgeDiv.innerHTML = '';
                } else {
                    image.style.height = '300px';
                    currentElement.tags.forEach(tag => {
                        const badgeSpan = document.createElement('span');
                        badgeSpan.classList.add('badge', 'text-bg-info');
                        badgeSpan.textContent = `${tag}`;
                        badgeDiv.append(badgeSpan);
                    });
                    this.querySelector('.right_col').append(badgeName);
                }
            });
        });
    };
    initPhones(currentPhones);


    function checkIfImageExists(parentFolder, subFolder, name, number, callback) {
        const img = new Image();
        img.src = `${parentFolder}/${subFolder}/${name}.${number}.jpg`;
        
        if (img.complete) {
          callback(true, img.src);
        } else {
          img.onload = () => {
            callback(true, img.src);
          };
          
          img.onerror = () => {
            callback(false, img.src);
          };
        }
      }

      checkIfImageExists('img', 'phones', 'samsung-showcase-a-galaxy-s-phone', '2', (exists, url) => {
        if (exists) {
            return url;
        } else {
            return false;
        }
      });
    
    phonesSearch.addEventListener('keyup', () => {
        const phonesInputTrimmed = phonesSearch.value.trim();
        console.log(phonesInputTrimmed)
        if (phonesInputTrimmed === '') {
            initPhones(currentPhones);
        } else {
            let phonesSearchInput = phonesSearch.value;
            phonesSearchInput = phonesSearchInput.toLowerCase();
            currentPhones = phones.filter(item => item['snippet'].toLowerCase().includes(phonesSearchInput));
            if (sortAlphabetically) {
                sortBy(true, currentPhones);
            } else {
                currentPhones = phones;
                initPhones(currentPhones)
            }
        }

    });


    sortByOptions.forEach(element => {
        element.addEventListener('click', () => {
            switch (Number(element.id)) {
                case 0:
                    sortBy('rele', currentPhones);
                    break;
                case 1:
                    sortAlphabetically = true;
                    sortBy(sortAlphabetically, currentPhones);
                    break;
                case 2:
                    sortBy('new', currentPhones);
                    break;
            }
        });
    });

    function sortBy(alpha, phones_list) {
        switch (alpha) {
            case true:
                new_phones = [];
                phone_names = [];
                phones_list.forEach(element => {
                    phone_names.push(element.name);
                });
                phone_names.sort();
                phone_names.forEach(name => {
                    phones_list.forEach(element => {
                        if (element.name.includes(name)) {
                            new_phones.push(element);
                        } else {
                            // pass
                        }
                    });
                });

                initPhones(new_phones);
                alpha = false;
                break;
            default:
                initPhones(currentPhones);


        }

    };

});