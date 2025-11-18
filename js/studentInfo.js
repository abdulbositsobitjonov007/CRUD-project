let pathStudentDetail = new URLSearchParams(location.search);
        
let studentInfoDetail = pathStudentDetail.get("id");

let studentInfoPanel = document.getElementById("student-info-panel");

async function getStudentInfo() {
    try {
        



            let res = await axios.get(`
                 https://691484a73746c71fe0489020.mockapi.io/students/${studentInfoDetail}`);
            let student = res?.data;
            console.log(student);

            
                studentInfoPanel.innerHTML +=
                    `
<div class="w-full h-[500px] bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-300 p-6 rounded-lg text-gray-900">
        <div class="flex items-center gap-6 mb-6">
            <div>
                <img class="w-[80px] h-[80px] rounded-full object-cover" src="${student.avatar}">
            </div>

            <div>
                <h1 class="text-2xl font-bold">${el.firstname} ${el.lastname}</h1>
                <p class="text-sm opacity-80">${el.profession}</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-sm">
            <p><strong>Phone:</strong> ${el.phone}</p>
            <p><strong>Email:</strong> ${el.email}</p>
            <p><strong>Age:</strong> ${el.age}</p>
            <p><strong>Grade:</strong> ${el.grade}</p>
            <p><strong>Rating:</strong> ${el.rating}</p>
            <p><strong>Telegram:</strong> ${el.telegram}</p>
            <p><strong>Gender:</strong> ${el.gender !== 'undefined' ? (el.gender ? 'Male' : 'Female') : '—'}</p>
            <p><strong>Teacher Id:</strong> ${el.teacherId ?? (teacherId || '—')}</p>
        </div>
    </div>
                `

    } catch (err) {
        console.log(err);
        
}}

getStudentInfo();