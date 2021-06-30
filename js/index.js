async function getUsers(){
	let response = await fetch('https://jsonplaceholder.typicode.com/users');
	let data = await response.json();
	return data;
};

getUsers().then(response => {	
	let table = "";
	response.forEach((res) => {
	  table += `<tr>`;
      table += `<td data-title="Name">` + res.name + `</td>`;
      table += `<td data-title="E-mail">` + res.email + `</td>`;
	  table += `<td class="select"><a id = "` + res.id + `" class = "button" onclick="return getPosts(this.id,'` + res.name + `','` + res.email + `');">Get User's Posts</a></td>`;
      table += `</tr>`;
});
	document.getElementById("container").innerHTML = table;
});

function toggleClasses(){
	document.querySelector('.detail').classList.toggle('open');
	document.querySelector('html').classList.toggle('open');
	document.querySelector('body').classList.toggle('open');
	}

async function getPosts(userId,name,email){
  let posts = await fetch('https://jsonplaceholder.typicode.com/posts?userId='+userId);
  let postData = await posts.json();
  let table = `<dt> Below Posts belongs to ` + name + ` with email id : ` + email + `</dt>`;
  table += `<dt>&nbsp;</dt><dt>&nbsp;</dt>`;
  postData.forEach((res) => {
	  table += `<dt> POST ID: ` + res.id + `</dt>`;
	  table += `<dt> POST TITLE: ` + res.title + `</dt>`;
      table += `<dd> POST BODY: ` + res.body + `</dd>`;
  });
  document.getElementById("postContainer").innerHTML = table;
  toggleClasses();
};

document.querySelector('.close').addEventListener('click', event => {
	toggleClasses();
  });
 
window.onload = getUsers;