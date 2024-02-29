
const fetchData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categori = data.data;
    const btnField = document.getElementById('btn-field');
    categori.forEach(element => {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => fetchDataByCategory(element.category_id));
        btn.className = 'btn btn-accent text-white lg:ml-7'
        btn.innerText = element.category;
        btnField.appendChild(btn);
    });
}
let selectedId = 1000;
const fetchDataByCategory = async (categoryId) => {
    selectedId = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const video = data.data;
    const videoField = document.getElementById('video-field');
    videoField.innerHTML = '';
    video.forEach(videoInfo => {
        console.log(videoInfo);
        const card = document.createElement('div');
        card.className = 'card card-compact h-93 bg-base-100 shadow-xl'
        card.innerHTML = `   
        <figure><img class="w-full h-64" src="${videoInfo.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body">
                  <div class="flex gap-4">
                  <div>
                  <img class="w-12 h-12 rounded-full object-cover" src="${videoInfo.thumbnail}" alt="Shoes" />
                  </div>
                  <div>
                  <h4 class="font-bold">${videoInfo.title}</h4>
                  <p>${videoInfo.authors[0].profile_name}</p>
                  <p>${videoInfo.others.views}</p>
                </div>
                  </div>
                </div>
              </div>
        `;
        videoField.appendChild(card);
    })
}
fetchDataByCategory(selectedId);
fetchData();