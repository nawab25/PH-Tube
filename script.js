const fetchData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const categori = data.data;
  const btnField = document.getElementById('btn-field');
  categori.forEach(element => {
    const btns = document.createElement('button');
    btns.className = 'catBtns btn btn-accent text-white lg:ml-7'

    //change bg color by clicking btn
    btns.addEventListener('click', () => {
      fetchDataByCategory(element.category_id);
      const allCatBtns = document.querySelectorAll('.catBtns');
      for (const catBtn of allCatBtns) {
        catBtn.classList.remove('bg-red-600');
      }
      btns.classList.add('bg-red-600');
    });
    btns.innerText = element.category;
    btnField.appendChild(btns);
  });
}


const noProductImg = document.getElementById('noProduct-img');
const sortBtn = document.getElementById('sort-btn');
let selectedId = 1000;
let sortByView = false;
sortBtn.addEventListener('click', () => {
  sortByView = true;
  fetchDataByCategory(selectedId, sortByView);
})
//get video making resources
const fetchDataByCategory = async (categoryId, sortByView) => {
  selectedId = categoryId;
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  const video = data.data;
  //sort by view
  if (sortByView) {
    video.sort((a, b) => {
      const firstViews = a.others?.views;
      const secondViews = b.others?.views;
      const convertedFirstViews = parseFloat(firstViews.replace("k", '')) || 0;
      const convertedSecondViews = parseFloat(secondViews.replace("k", '')) || 0;
      return convertedSecondViews - convertedFirstViews;
    })
  }
  //no product images condition
  if (video.length === 0) {
    noProductImg.classList.remove('hidden');
  }
  else {
    noProductImg.classList.add('hidden');
  }

  const videoField = document.getElementById('video-field');
  videoField.innerHTML = '';
  video.forEach(videoInfo => {
    console.log(videoInfo);
    //creating dynamic video cards
    const card = document.createElement('div');
    card.className = 'card card-compact h-93 bg-base-100 shadow-xl'
    card.innerHTML = `   
        <figure><img class="w-full h-64" src="${videoInfo.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body">
                  <div class="flex gap-4">
                  <div>
                  <img class="w-12 h-12 rounded-full object-cover" src="${videoInfo.authors[0].profile_picture}" alt="Shoes"/>
                  </div>
                  <div>
                  <h4 class="font-bold">${videoInfo.title}</h4>
                  <div>
                  <p>${videoInfo.authors[0].profile_name}</p>
                  </div>
                  <p>${videoInfo.others.views}</p>
                </div>
                  </div>
                </div>
              </div>
        `;
    videoField.appendChild(card);
  })
}
fetchDataByCategory(selectedId, sortByView);
fetchData();