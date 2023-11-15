function makePrediction() {
    const stars = parseFloat(document.getElementById('stars').value);
    const reviews = parseFloat(document.getElementById('reviews').value);
    const price = parseFloat(document.getElementById('price').value);
    const isBestSeller = document.getElementById('isBestSeller').checked;
    const word_count = parseFloat(document.getElementById('word_count').value);
    const discount = parseFloat(document.getElementById('discount').value);

    // Validate that stars is between 1 and 5
    if (stars < 0 || stars > 5) {
        alert('Stars must be between 1 and 5.');
        return;
    }

    // Get the selected value from the category dropdown menu
    const selectedCategory = document.getElementById('categoryName').value;

    const data = {
        stars,
        reviews,
        price,
        isBestSeller,
        word_count,
        discount,
        categoryName_Baby: selectedCategory === 'Baby' ? 1 : 0,
        categoryName_Beauty: selectedCategory === 'Beauty' ? 1 : 0,
        categoryName_Grocery: selectedCategory === 'Grocery' ? 1 : 0,
        categoryName_Health_Personal_Care: selectedCategory === 'Health Personal Care' ? 1 : 0,
        categoryName_Health_Care_Products: selectedCategory === 'Health Care Products' ? 1 : 0,
        categoryName_Home_Kitchen: selectedCategory === 'Home Kitchen' ? 1 : 0,
        categoryName_Home_Storage_Organization: selectedCategory === 'Home Storage Organization' ? 1 : 0,
        categoryName_Office_Products: selectedCategory === 'Office Products' ? 1 : 0,
        categoryName_Pet_Supplies: selectedCategory === 'Pet Supplies' ? 1 : 0,
        categoryName_Toys_Games: selectedCategory === 'Toys Games' ? 1 : 0,
    };

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('predictionResult').innerText = `Prediction: ${result.prediction.toFixed(2)}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('predictionResult').innerText = 'Error making prediction';
    });
}
