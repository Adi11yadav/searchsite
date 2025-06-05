let users = [];
let filteredUsers = [];

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => {
      users = data;
      filteredUsers = data;
      renderUsers(data);
      hideResults(); // clear result area initially
    })
    .catch(err => {
      document.getElementById("error").textContent = "Failed to fetch users: " + err.message;
    });
}

function renderUsers(userList) {
  const userListDiv = document.getElementById("userList");
  userListDiv.innerHTML = "";
  userList.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    userListDiv.appendChild(div);
  });
}

function showResults(userList) {
  document.getElementById("resultContainer").classList.remove("hidden");
  document.getElementById("resultCount").textContent = `Results: ${userList.length}`;
  document.getElementById("resultNames").textContent = "Names: " + userList.map(u => u.name).join(", ");
}

function hideResults() {
  document.getElementById("resultContainer").classList.add("hidden");
}

document.getElementById("reloadBtn").addEventListener("click", () => {
  fetchUsers();
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const result = users.filter(user =>
    user.name.toLowerCase().includes(keyword) ||
    user.email.toLowerCase().includes(keyword)
  );
  filteredUsers = result;
  renderUsers(result);
  showResults(result);
});

window.addEventListener("load", () => {
  fetchUsers();
});
