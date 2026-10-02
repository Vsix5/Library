const form = document.querySelector('#add-book-form');
const submitBtn = document.querySelector('#submit-btn');
const formMsg = document.querySelector('#form-message');
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Adding the Book"
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    if(!response.ok) throw new Error('Failed to create resource');
    const result = await response.json();
    console.log(result);
    form.reset();
        formMsg.textContent = "Book added Successfully!";
        setTimeout(() => {
        formMsg.textContent = "";
        }, 5000);
  }
  catch(error) {
    console.error('Submission error:', error);
    formMsg.textContent = "Failed to add book. Please try again.";
    setTimeout(() => {
      formMsg.textContent = "";
    }, 5000)
  }
  finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "ADD A BOOK";
  }
});
