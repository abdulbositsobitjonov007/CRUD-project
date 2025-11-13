let path = new URLSearchParams(location.search);

let teacherId = path.get("teacherId");

let students = document.getElementById("students");

let addStudents = document.getElementById("add-students");

let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");

let select = null;

addStudents.addEventListener("click", function () {
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

async function getStudents() {
    try {
        let res = await axios(teacherId ? `https://691484a73746c71fe0489020.mockapi.io/teachers/${teacherId}/students` : `https://691484a73746c71fe0489020.mockapi.io/students`)
        console.log(res.data);

        res?.data.map((el) => {
            students.innerHTML +=
                `


<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg bg-gradient-to-br from-orange-600 via-amber-700 to-rose-600 text-white
">
    <div class="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            
        </button>
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
    <div class="flex flex-col items-center pb-10 ">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src=${el.avatar} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${el.firstname} ${el.lastname}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">${el.age}</span>
        <div class="flex mt-4 md:mt-6">
            <a href="../pages/students.html?teacherId=${el.id}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">See Info</a>
            <button onClick="editStudents(${el.id})" class="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-700 duration-300">Edit</button>
            <button onClick="deleteStudents(${el.id})" class="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-red-700 dark:bg-gray-800 dark:text-red-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700 duration-300">Delete</button>
        </div>
    </div>
</div>

        `
        })

    } catch (err) {
        console.log(err);

    }
}

getStudents();

async function deleteStudents(id) {
    try {
        await axios.delete(`https://691484a73746c71fe0489020.mockapi.io/teachers/${teacherId}/students/${id}`);
        getStudents();
    } catch (err) {
        console.log(err);

    }
}

innerModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    let option = {};
    option.firstname = e.target[0].value;
    option.lastname = e.target[1].value;
    option.phone = e.target[2].value;
    option.email = e.target[3].value;
    option.age = e.target[4].value;
    option.experience = e.target[5].value;
    option.grade = e.target[6].value;
    option.avatar = e.target[7].value;
    option.rating = e.target[8].value;
    option.profession = e.target[9].value;
    option.telegram = e.target[10].value;
    option.gender = e.target[11].checked;

    try {

        select ?

            await axios.put(`https://691484a73746c71fe0489020.mockapi.io/students/${select}`, option)
            :
            await axios.post(`https://691484a73746c71fe0489020.mockapi.io/students`, option)

        outerModal.classList.add("hidden")
        getStudents();

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


async function editStudents(id) {
    outerModal.classList.remove("hidden");
    select = id;
    try {
        let res = await axios.get(`https://691484a73746c71fe0489020.mockapi.io/teachers/${teacherId}/students${id}`);
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