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
        const button = document.createElement("button");
        button.classList.add("btn", "btn-error", "text-white");
        let categoriesName = category.category;
        button.innerText = categoriesName;

        document.getElementById("categories-container").appendChild(button);
    }
};

loadCatagories();

const loadVideos = async () => {
    let res = await fetch(
        "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    let data = await res.json();
    console.log(data);
    let videos = data.videos;

    displayVideos(videos);
};

const displayVideos = (videos) => {
    for (video of videos) {
        let thumbnail = video.thumbnail;
        let profilePic = video.authors[0].profile_picture;
        let title = video.title;
        let profileName = video.authors[0].profile_name;
        let views = video.others.views;
        let verified = video.authors[0].verified;

        let tik = "";
        if (verified === true) {
            tik = `<i class="text-blue-700 fa-solid fa-circle-check"></i>`;
        }

        let videoElement = document.createElement("div");
        videoElement.innerHTML = `
            <div class="flex h-[300px] flex-col">
                <div>
                    <!-- Img container -->
                    <div>
                        <img class="rounded-lg w-full h-[200px]" src="${thumbnail}" alt="" />
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
                                    <p class="text-semiblack font-semibold"><span>${views}</span>K Views</p>
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
