let path = new URLSearchParams(location.search);

let teacherId = path.get("teacherId");

let students = document.getElementById("students");

let addStudents = document.getElementById("add-students");
let selectTeachers = document.getElementById("select-teachers");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");
let studentBtn = document.getElementById("students-btn");
let toast = document.getElementById("toast");

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
    innerModal[11].value = "";
    innerModal[12].checked = false;
});

innerModal.addEventListener("click", function (e) {
    e.stopPropagation();
});

async function getStudents() {
    try {
        let res = await axios(teacherId ? `https://691484a73746c71fe0489020.mockapi.io/teachers/${teacherId}/students` : `https://691484a73746c71fe0489020.mockapi.io/students`)
        console.log(res.data);
        students.innerHTML = "";
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
            <a href="../pages/studentDetail.html?id=${el.id}" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">See Info</a>
            <button onClick="editStudents(${el.teacherId}, ${el.id})" class="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-blue-700 duration-300">Edit</button>
            <button onClick="deleteStudents(${el.teacherId}, ${el.id})" class="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-red-700 dark:bg-gray-800 dark:text-red-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700 duration-300">Delete</button>
        </div>
    </div>
   
</div>

        `
        })

    } catch (err) {
        console.log(err);

    }
}

studentBtn.addEventListener("click", function () {
    outerModal.classList.add("hidden");
})

async function getTeachers() {
    try {
        let res = await axios.get("https://691484a73746c71fe0489020.mockapi.io/teachers");
        let teachers = res?.data;
        console.log(teachers);

        teachers.map((el) => {
            selectTeachers.innerHTML += `
        <option value="${el.id}">${el.firstname}</option>
        `
        })
    } catch (err) {
        console.log(err);

    }
}

getTeachers();

getStudents();



async function deleteStudents(teacherId, id) {
    try {
        await axios.delete(`https://691484a73746c71fe0489020.mockapi.io/teachers/${teacherId}/students/${id}`);
        getStudents();
        toast.classList.remove("hidden");
        toast.textContent = `Student with id: ${id} was deleted.`;

        setTimeout(() => {
            toast.classList.add("hidden")
        }, 3000)

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
    options.teacherId = e.target[11].value;
    options.gender = e.target[12].checked;



    try {

        if (select) {
            await axios.put(`https://691484a73746c71fe0489020.mockapi.io/teachers/${options.teacherId}/students/${select}`, options)
        } else {
            await axios.post(`https://691484a73746c71fe0489020.mockapi.io/teachers/${options.teacherId}/students`, options)
        }

        getStudents();
        innerModal.classList.add("hidden");
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
        innerModal[11].value = "";
        innerModal[12].checked = false;
    } catch (err) {
        console.log(err);

    }

});


async function editStudents(teacherId, id) {
    outerModal.classList.remove("hidden");
    select = id;
    try {
        let res = await axios.get(`https://691484a73746c71fe0489020.mockapi.io/teachers/${teacherId}/students/${id}`);
        let oneStudent = res?.data;
        innerModal[0].value = oneStudent.firstname;
        innerModal[1].value = oneStudent.lastname;
        innerModal[2].value = oneStudent.phone;
        innerModal[3].value = oneStudent.email;
        innerModal[4].value = oneStudent.age;
        innerModal[5].value = oneStudent.experience;
        innerModal[6].value = oneStudent.grade;
        innerModal[7].value = oneStudent.avatar;
        innerModal[8].value = oneStudent.rating;
        innerModal[9].value = oneStudent.profession;
        innerModal[10].value = oneStudent.telegram;
        innerModal[11].value = oneStudent.teacherId;
        innerModal[12].checked = oneStudent.gender;

    } catch (err) {
        console.log(err);

    }
}