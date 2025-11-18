let teachers = document.getElementById("teachers");

let addTeachers = document.getElementById("add-teachers");

let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");
let search = document.getElementById("search");
let pagination = document.getElementById("pagination");
let allTeachers;
let sortByNames = document.getElementById("sort-by-names");

sortByNames.addEventListener("click", async function (e) {
    let sort = e.target.value;

    try {
        let resUI = await axios(`https://691484a73746c71fe0489020.mockapi.io/teachers?sortBy=firstname&order=${sort}`);
    mapAllTeachers(teachers, resUI.data)
    } catch (err) {
        console.log(err);

    }
})

let select = null;

addTeachers.addEventListener("click", function () {
    outerModal.classList.remove("hidden");
});

outerModal.addEventListener("click", function () {
    outerModal.classList.add("hidden");
    select = null;
    innerModal[0].value = "";
    innerModal[1].value = "";
    innerModal[2].value = "";
    innerModal[3].value = "";
    innerModal[4].value = "";
    innerModal[5].value = "";
    innerModal[6].value = "";
    innerModal[7].value = "";
    innerModal[8].value = "";
    innerModal[9].value = "";
    innerModal[10].value = "";
    innerModal[11].checked = false;
});

innerModal.addEventListener("click", function (e) {
    e.stopPropagation();
});

async function getTeachers() {
    let page = 1;
    let limit = 6;
    try {
        let res = await axios(`https://691484a73746c71fe0489020.mockapi.io/teachers`);
        let resUI = await axios(`https://691484a73746c71fe0489020.mockapi.io/teachers?page=${page}&limit=${limit}`);
        console.log(res.data);
        mapAllTeachers(teachers, resUI.data)
        let pageCount = Math.ceil(res.data.length / limit);
        paginationBtn(page, limit, pageCount)
    } catch (err) {
        console.log(err);

    }
}

getTeachers();

function paginationBtn(page, limit, pageCount) {

    pagination.innerHTML +=
        `
        
            <li>
              <a href="#" class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-10 focus:outline-none">Previous</a>
            </li>

            
          
        `;

    for (let i = 1; i <= pageCount; i++) {
        pagination.innerHTML +=
            ` 
                       <li>
                             <button onClick="passPage(${i}, ${limit})"
                              class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none">${i}</button>
                        </li>
            
            `
    };

    pagination.innerHTML +=
        `
        <li>
              <button onClick="next(${page} , ${limit}, ${pageCount})"  class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-10 focus:outline-none">Next</button>
            </li>
        `
}

async function passPage(page, limit) {
    try {
        let resUI = await axios(`https://691484a73746c71fe0489020.mockapi.io/teachers?page=${page}&limit=${limit}`);

        mapAllTeachers(teachers, resUI.data);

    } catch (err) {
        console.log(err);

    }
}

async function next(page, limit, pageCount) {
    page++;
    try {
        let resUI = await axios(`https://691484a73746c71fe0489020.mockapi.io/teachers?page=${page}&limit=${limit}`);

        mapAllTeachers(teachers, resUI.data);
        paginationBtn(page, limit, pageCount)
    } catch (err) {
        console.log(err);

    }
}

function mapAllTeachers(content, data) {
    content.innerHTML = "";
    data.map((el) => {
        content.innerHTML +=
            `


<div class="w-full max-w-sm bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#11bdf6] text-white border border-[#1e40af] rounded-xl shadow-xl p-5 flex flex-col items-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.03]">
    <div class="flex justify-end px-4 pt-4">
        
        <!-- Dropdown menu -->
        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src=${el.avatar} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${el.firstname} ${el.lastname}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">${el.profession}</span>
        <div class="flex mt-4 md:mt-6">
            <a href="../pages/students.html?teacherId=${el.id}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">See the students</a>
            <button onClick="editTeachers(${el.id})" class="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-700 duration-300">Edit</button>
            <button onClick="deleteTeachers(${el.id})" class="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-red-700 dark:bg-gray-800 dark:text-red-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700 duration-300">Delete</button>
        </div>
    </div>
    
</div>

        `
    })
}

async function deleteTeachers(id) {
    try {

        let res = await axios.get(`https://691484a73746c71fe0489020.mockapi.io/teachers/${id}/students`);

        if (res?.data.length > 0) {
            alert("You can not delete this teacher, He/She has some students on his/her own!");
        } else if (res?.data.length == 0 || res?.data === undefined) {
            await axios.delete(`https://691484a73746c71fe0489020.mockapi.io/teachers/${id}`);
        } else {
            res?.data === 0
        }


        getTeachers();
    } catch (err) {
        console.log(err);

    }
}

innerModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    let options = {};
    options.firstname = e.target[0].value;
    options.lastname = e.target[1].value;
    options.phone = e.target[2].value;
    options.email = e.target[3].value;
    options.age = e.target[4].value;
    options.experience = e.target[5].value;
    options.grade = e.target[6].value;
    options.avatar = e.target[7].value;
    options.rating = e.target[8].value;
    options.profession = e.target[9].value;
    options.telegram = e.target[10].value;
    options.gender = e.target[11].checked;

    try {

        select ?

            await axios.put(`https://691484a73746c71fe0489020.mockapi.io/teachers/${select}`, options)
            :
            await axios.post(`https://691484a73746c71fe0489020.mockapi.io/teachers`, options)

        outerModal.classList.add("hidden")
        getTeachers();

        select = null;

        innerModal[0].value = "";
        innerModal[1].value = "";
        innerModal[2].value = "";
        innerModal[3].value = "";
        innerModal[4].value = "";
        innerModal[5].value = "";
        innerModal[6].value = "";
        innerModal[7].value = "";
        innerModal[8].value = "";
        innerModal[9].value = "";
        innerModal[10].value = "";
        innerModal[11].checked = false;
    } catch (err) {
        console.log(err);

    }

});


async function editTeachers(id) {
    outerModal.classList.remove("hidden");
    select = id;
    try {
        let res = await axios.get(`https://691484a73746c71fe0489020.mockapi.io/teachers/${id}`);
        innerModal[0].value = res.data.firstname;
        innerModal[1].value = res.data.lastname;
        innerModal[2].value = res.data.phone;
        innerModal[3].value = res.data.email;
        innerModal[4].value = res.data.age;
        innerModal[5].value = res.data.experience;
        innerModal[6].value = res.data.grade;
        innerModal[7].value = res.data.avatar;
        innerModal[8].value = res.data.rating;
        innerModal[9].value = res.data.profession;
        innerModal[10].value = res.data.telegram;
        innerModal[11].checked = res.data.gender;

    } catch (err) {
        console.log(err);

    }
}

search.addEventListener("input", async function (e) {
    let searchValue = e.target.value;



    try {
        let res = await axios.get(`https://691484a73746c71fe0489020.mockapi.io/teachers?firstname=${searchValue}`);

        mapAllTeachers(teachers, res?.data)

    } catch (err) {
        console.log(err);

    }
})