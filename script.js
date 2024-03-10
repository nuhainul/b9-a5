// alert('angta lege gese, boss!');

//starts
// handlingSearch();
const handlingSearch = () => {

    toggleLoadingSpinner(true);

    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    // console.log(searchText);
    loadSearchedPosts(searchText);
}


// }
const loadSearchedPosts = async (searchText = '') => {

    const searchTimeOut = setTimeout(() => {
        console.log('wait for a bit'); // এখানে ক্লিয়ারইনটার্ভাল দিলে কেমন হয়? 
    }, 2000);

    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await response.json();
    const searchedPosts = data.posts;
    // console.log(searchedPosts);
    displaySearchedPosts(searchedPosts);
}

const displaySearchedPosts = (searchedPosts) => {
    // console.log(searchedPosts);
    toggleLoadingSpinner(true); // দেখাচ্ছে না কেন, নাকি দেখাচ্ছে?  

    const searchedPostsContainer = document.getElementById('letsDiscussPostResults');
    // ডিফল্ট কনটেন্ট বা কনটেইনার খালি করা 
    searchedPostsContainer.textContent = '';

    searchedPosts.forEach(searchedPost => {
        // console.log(searchedPost);
        // div toiri 
        const searchedPostCard = document.createElement('div');
        searchedPostCard.classList = `p-4 lg:w-[726px] w-[100%] mx-auto bg-[#12132D0D] rounded-2xl m-1 border border-gray-300 lg:ml-0 mb-6`;
        // innerHTML set kora 
        searchedPostCard.innerHTML = `
        <div id="" class="flex gap-4">
                            <!-- online obotar -->
                            <div id="obotarContainer" class="">
                                <div class="avatar indicator">
                                    <span id="" class="activeStatusIndicator indicator-item badge badge-secondary bg-green-600 border-0 ${searchedPost.isActive ? 'bg-blue-600' : 'bg-red-600'}"></span>
                                    <div class="w-24 rounded-xl">
                                        <img
                                            src="${searchedPost.image}" />
                                    </div>
                                </div>
                            </div>

                            <div id="" class="w-[90%]">
                                <div id="" class="flex gap-4 font-medium">
                                    <span id="" class="">#</span>
                                    <span id="" class="">${searchedPost.category}</span>

                                    <span id="" class="">Author: </span>
                                    <span id="" class="">${searchedPost.author.name}</span>
                                </div>

                                <div id="" class="border-b border-dashed border-[#12132D40]">
                                    <p id="" class="font-bold pt-3 pb-4">${searchedPost.title}</p>
                                    <p id="" class="pb-5">${searchedPost.description}</p>
                                </div>

                                <div id="" class="flex justify-between">
                                    <div id="postStatsContainer" class="flex items-center gap-10">
                                        <div id="" class="flex gap-2">
                                            <img src="./images/comment.svg" alt="" height="21px" width="21px">
                                            <span id="" class=""> ${searchedPost.comment_count}</span>
                                        </div>
                                        <div id="" class="flex gap-2">
                                            <img src="./images/view.svg" alt="" height="21px" width="21px">
                                            <span id="" class=""> ${searchedPost.view_count}</span>
                                        </div>
                                        <div id="" class="flex gap-2">
                                            <img src="./images/time.svg" alt="" height="21px" width="21px">
                                            <span id="" class=""> ${searchedPost.posted_time}</span>
                                        </div>
                                    </div>

                                    <div id="" class="pothitoButtonContainer">
                                        <button class="btn pothitoButton"><img src="./images/markread.svg"
                                                alt=""></button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        // if (`${searchedPost.isActive}` === true) { 
        //     document.getElementsByClassName('activeStatusIndicator').classList.remove('bg-green-600'); 
        // } else {
        //     // document.getElementsByClassName('activeStatusIndicator').classList.add('bg-green-600'); 
        // }

        // if (isActive === true) {
        //     searchedPostCard.classList.add('bg-red-600');
        // } else {
        //     searchedPostCard.classList.remove('bg-green-600');
        // }
        // child append kora  
        searchedPostsContainer.appendChild(searchedPostCard);

        let isActive = `${searchedPost.isActive}`;
        let title = `${searchedPost.title}`;
        let viewCount = `${searchedPost.view_count}`;
        // console.log(title, viewCount, isActive);

        handlingdynamicPothito(title, viewCount);

        // return `${searchedPost.isActive}`;

        // let isActive = `${searchedPost.isActive}`;
        // console.log(101, isActive);

        // console.log(98, `${searchedPost.isActive}`);
        // let activeStatus = document.getElementsByClassName('activeStatusIndicator');

        // let activeStatus = document.querySelectorAll('.activeStatusIndicator');

        // if (isActive === true) {
        //     activeStatus.classList.add('bg-green-600');
        //     activeStatus.classList.add('border-0');
        // } else {
        //     activeStatus.classList.remove('bg-green-600');            
        // };
        // console.log(104, activeStatus);


        // searchedPosts.forEach(searchedPost => {
        //     // 
        //     // এখানে অ্যাকটিভ স্ট্যাটাস দেখা যায় 
        // const activeStatus = document.getElementById('activeStatusIndicator');

        // if (`${searchedPost.isActive}` === true) {
        // // if (`${searchedPost?.isActive}`) {
        //     activeStatus.classList.add('bg-green-600');
        //     activeStatus.classList.add('border-0');
        // } 
        // // else {
        // //     activeStatus.classList.add('bg-red-600');
        // // }
        // });
        // //
    });
    // hide loading spinner 
    toggleLoadingSpinner(false);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loadSpinnerContainer');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

loadSearchedPosts();
//ends


let shobPothito = document.getElementsByClassName('pothitoButton');
console.log(shobPothito);
let pothitoCountSpan = document.getElementById('pothitoCountSpan');

function handlingdynamicPothito(title, viewCount) {
    // এখানে কেরিকেচার হবে 
    let pothitoCount = 0;
    let dynamicPothitoDivContainer = document.getElementById('dynamicPothitoDivContainer');
    // ডিফল্ট কনটেন্ট বা কনটেইনার খালি করা 
    // dynamicPothitoDivContainer.textContent = '';
    let dynamicPothitoDivCard = document.createElement('section');

    for (let i = 0; i < shobPothito.length; i++) {

        let pothito = shobPothito[i];

        pothito.addEventListener('click', function () {

            pothitoCount = pothitoCount + 1;
            pothitoCountSpan.innerText = pothitoCount;
            dynamicPothitoDivCard.classList = `mb-6 bg-white rounded-2xl p-8 font-inter text-base flex`;
            // innerHTML set kora 
            dynamicPothitoDivCard.innerHTML = `
            <div id="" class="max-w-[212px] font-semibold">
                <p id="" class="dynamicPothitoDiv">${title}</p>
            </div>

            <div id="" class="viewCount flex items-center gap-4">
                <img src="./images/view.svg" alt="">
                <p id="" class="">${viewCount}</p>
            </div>
        `;
            // if (`${searchedPost.isActive}` === true) { 
            //     document.getElementsByClassName('activeStatusIndicator').classList.remove('bg-green-600'); 
            // } else {
            //     // document.getElementsByClassName('activeStatusIndicator').classList.add('bg-green-600'); 
            // }

            // child append kora  
            dynamicPothitoDivContainer.appendChild(dynamicPothitoDivCard);

        });
    }

}

////সব পোস্ট বাই ডিফল্ট দেখানোর এই বেগার আগে খাটা হইসিলো 
// const loadShobPosts = async () => {
//     const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
//     const data = await response.json();
//     const shobPosts = data.posts; 
//     // console.log(20, shobPosts);

//     const shobPostCardsContainer = document.getElementById('letsDiscussPostResults');

//     shobPosts.forEach(shobPost => {
//         //    console.log(shobPost);

//         const shobPostCard = document.createElement('div');

//         shobPostCard.classList = `p-4 lg:w-[726px] w-[100%] mx-auto bg-[#12132D0D] rounded-2xl m-1 border border-gray-300 lg:ml-0 mb-6`;

//         shobPostCard.innerHTML = `
//         <div id="" class="flex gap-4">
//                             <!-- online obotar -->
//                             <div id="obotarContainer" class="">
//                                 <div class="avatar online">
//                                     <div class="w-24 rounded-xl">
//                                         <img
//                                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div id="" class="">
//                                 <div id="" class="flex gap-4 font-medium">
//                                     <span id="" class=""># </span>
//                                     <span id="" class="">${shobPost.category}</span>

//                                     <span id="" class="">Author : </span>
//                                     <span id="" class="">${shobPost.author.name}</span>
//                                 </div>

//                                 <div id="" class="border-b border-dashed border-[#12132D40]">
//                                     <p id="" class="font-bold pt-3 pb-4">${shobPost.title}</p>
//                                     <p id="" class="pb-5">${shobPost.description}</p>
//                                 </div>

//                                 <div id="" class="flex justify-between">
//                                     <div id="postStatsContainer" class="flex items-center gap-2">
//                                         <div id="" class="flex gap-1">
//                                             <img src="./images/comment.svg" alt="" height="21px" width="21px">
//                                             <span id="" class=""> ${shobPost.comment_count}</span>
//                                         </div>
//                                         <div id="" class="flex gap-1">
//                                             <img src="./images/view.svg" alt="" height="21px" width="21px">
//                                             <span id="" class=""> ${shobPost.view_count}</span>
//                                         </div>
//                                         <div id="" class="flex gap-1">
//                                             <img src="./images/time.svg" alt="" height="21px" width="21px">
//                                             <span id="" class=""> ${shobPost.posted_time}</span>
//                                         </div>
//                                     </div>

//                                     <div id="" class="pothitoButtonContainer">
//                                         <button onclick="handlingdynamicPothito(title, viewCount)" class="btn pothitoButton"><img src="./images/markread.svg"
//                                                 alt=""></button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//         `;

//         shobPostCardsContainer.appendChild(shobPostCard);

//     });
// }
// loadShobPosts();

// const loadCategoryPosts = async () => {} // এটাকেই পরে=উপরে সার্চডপোস্ট আকারে করেছি 

//// এখানে সর্বশেষ পোস্ট কার্ডগুলোর কাজ করা হলো 
const loadLatestPosts = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    const latestPosts = data; //এখানে ডাটা.data দেয়া হলো না কারণ কোনো নাম নেই 
    // console.log(8, latestPosts);

    const latestPostCardsContainer = document.getElementById('latestPostCardsContainer');

    latestPosts.forEach(latestPost => {
        //    console.log(latestPost);
        //    console.log(latestPost.cover_image);

        const latestPostCard = document.createElement('div');

        latestPostCard.classList = `card w-96 bg-base-100 shadow-xl mx-auto border border-[#12132D26]`;

        latestPostCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${latestPost.cover_image}" alt="author"
            class="rounded-xl" />
    </figure>
    <div class="card-body">

        <div class="flex gap-4">
            <div id="" class=""><img src="./images/date.svg" alt=""></div>
            <div id="" class="text-gray-500">${latestPost.author?.posted_date ? latestPost.author.posted_date : 'No publish date'}</div>
        </div>

        <div id="" class="items-center">
            <h2 class="card-title font-extrabold">${latestPost.title}</h2>
            <p class="text-base pt-4">${latestPost.description}</p>
        </div>

        <div class="card-actions">

            <div class="stat flex">
                <!-- <div class="stat-figure text-secondary"> -->
                <div class="">
                    <!-- <div class="avatar online"> -->
                    <div class="avatar">
                        <div class="w-16 rounded-full">
                            <img
                                src="${latestPost.profile_image}" />
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div id="" class="font-bold text-base">${latestPost.author.name}</div>
                    <div id="" class="text-gray-500">${latestPost.author?.designation ? latestPost.author.designation : 'Unknown'}</div>
                </div>
            </div>

        </div>
    </div>
        `;
        // latestPostCard-taake child hishebe append korlam 
        latestPostCardsContainer.appendChild(latestPostCard);

    });
}

loadLatestPosts();