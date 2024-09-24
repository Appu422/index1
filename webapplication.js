document.getElementById('item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const description = document.getElementById('item-description').value;

    const item = {
        name,
        price,
        description
    };

    addItemToList(item);
    this.reset(); 
});

function addItemToList(item) {
    const container = document.getElementById('items-container');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>${item.description}</p>
    `;
    container.appendChild(itemDiv);
}
