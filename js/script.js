//Fetch, Load and Show catagories

const loadCatagories = async () => {
    let res = await fetch(
        "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    let data = await res.json();
    let categories = data.categories;
    displayCatagories(categories);
};

const displayCatagories = (categories) => {
    for (category of categories) {
        const buttonContainer = document.createElement("div");
        let categoriesName = category.category;
        buttonContainer.innerHTML = `
        <button id="btn-${category.category_id}" onclick = "loadVideoByID(${category.category_id})" class="btn btn-ct">${categoriesName}</button>
        `;
        document
            .getElementById("categories-container")
            .appendChild(buttonContainer);
    }
};

loadCatagories();

const loadVideos = async (searchText = "") => {
    let res = await fetch(
        `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
    );
    let data = await res.json();
    let videos = data.videos;

    displayVideos(videos);
};

const displayVideos = (videos) => {
    document.getElementById("video-container").innerHTML = "";

    if (videos.length === 0) {
        document.getElementById("video-container").innerHTML = `
        <div class="col-span-4 min-h-[50vh] flex flex-col m-auto justify-center items-center">
            <img src="icon/icon.png">
            <h1 class="text-2xl font-bold text-center">Oops!! Sorry, There is no content here</h1>
        </div>
        `;
    }

    for (video of videos) {
        let thumbnail = video.thumbnail;
        let profilePic = video.authors[0].profile_picture;

        let title = video.title;
        let profileName = video.authors[0].profile_name;

        let views = video.others.views;
        let postDate = video.others.posted_date;

        let verified = video.authors[0].verified;
        let videoID = video.video_id;

        let tik = "";
        if (verified === true) {
            tik = `<i class="text-blue-700 fa-solid fa-circle-check"></i>`;
        }
        let length = "";
        if (postDate !== "") {
            length = gerTimeString(parseInt(postDate));
        } else {
            length = "0 seconds ago";
        }

        let videoElement = document.createElement("div");
        videoElement.innerHTML = `
            <div class="flex h-[300px] flex-col">
                <div>
                    <!-- Img container -->
                    <div class="relative">
                        <img onclick="loadDetails('${videoID}')" class="cursor-pointer rounded-lg w-full h-[200px]" src="${thumbnail}" alt="" />
                        <div class="absolute bottom-1 right-1 text-xs text-white bg-black px-2 py-1 rounded">${length}</div>
                    </div>
                    <!-- Img Container end -->

                    <!-- Title and profile pic container -->
                    <div class="flex gap-1 mt-2">
                        <div class="w-[20%]">
                            <img
                                class="w-[50px] h-[50px] rounded-full"
                                src="${profilePic}"
                                alt=""
                            />
                        </div>
                            <div class="w-[80%]">
                                <h1
                                    class="text-lg md:text-xl lg:text-xl font-bold"
                                >
                                    ${title}
                                </h1>

                                <div>
                                    <p class="text-semiblack font-semibold">${profileName} ${tik}</p>
                                    <p class="text-semiblack font-semibold"><span>${views}</span> Views</p>
                                </div>
                            </div>
                    </div>
                    <!-- Title and profile pic container end -->
                </div>
            </div>
        `;

        document.getElementById("video-container").appendChild(videoElement);
    }
};

loadVideos();

const gerTimeString = (time) => {
    let remainHour = parseInt(time / 3600);
    let remainSecond = parseInt(time % 3600);
    let remainMinute = parseInt(remainSecond / 60);
    remainSecond = parseInt(remainSecond % 60);

    return `${remainHour} Hours ${remainMinute} Minutes Ago`;
};

const loadVideoByID = async (id) => {
    let api = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    let res = await fetch(api);
    let data = await res.json();
    displayVideos(data.category);
    removeActiveClass();
    let btn = `btn-${id}`;
    document.getElementById(btn).classList.add("btn-error", "text-white");
};

const removeActiveClass = () => {
    let btns = document.getElementsByClassName("btn-ct");
    for (btn of btns) {
        btn.classList.remove("btn-error");
        btn.classList.add("text-black");
    }
};

const loadDetails = async (id) => {
    let res = await fetch(
        `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    );
    let video = await res.json();
    displayDetails(video);
};

const displayDetails = (video) => {
    console.log(video);
    let thumb = video.video.thumbnail;

    let profilePic = video.video.authors[0].profile_picture;
    let title = video.video.title;
    let profileName = video.video.authors[0].profile_name;
    let views = video.video.others.views;
    let postDate = video.video.others.posted_date;
    let description = video.video.description;

    let modal = document.getElementById("details-container");
    modal.innerHTML = `
    
        <div>
            <img class="w-full rounded-lg" src="${thumb}" alt="" />
        </div>
        <div class="flex items-center gap-3 my-2">
            <div class="w-max">
                <img
                    class="w-[50px] h-[50px] rounded-full"
                    src="${profilePic}"
                    alt=""
                />
            </div>
            <div class="w-max">
                <h1 class="text-xl font-bold">${title}</h1>
            </div>
        </div>
        <div
            class="my-1 flex gap-1 justify-between items-center"
        >
            <div>
                <p class="text-lg text-semiblack font-semibold">
                    ${profileName}
                </p>
                <p class="text-semiblack font-semibold">${views} Views</p>
            </div>
            <div>
                <p class="text-semiblack font-semibold">
                    ${gerTimeString(parseInt(postDate))}
                </p>
            </div>
        </div>
        <div>
            <p>
                ${description}
            </p>
        </div>
    `;
    my_modal_1.showModal();
};

document.getElementById("search").addEventListener("keyup", function (press) {
    console.log(press.target.value);
    loadVideos(press.target.value);
});
