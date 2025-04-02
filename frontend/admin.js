const API_URL = "https://your-railway-url.up.railway.app/schedule";

// 시간표 불러오기
function loadSchedule() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById("scheduleTable");
      table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>요일</th>
                    <th>과목</th>
                    <th>시간</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            `;

      data.forEach((item) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = item.id;
        row.insertCell(1).textContent = item.day;
        row.insertCell(2).textContent = item.subject;
        row.insertCell(3).textContent = item.time;

        // 수정 버튼
        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.onclick = () => updateSchedule(item.id);
        row.insertCell(4).appendChild(editBtn);

        // 삭제 버튼
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.onclick = () => deleteSchedule(item.id);
        row.insertCell(5).appendChild(deleteBtn);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// 시간표 추가
function addSchedule() {
  const day = document.getElementById("day").value;
  const subject = document.getElementById("subject").value;
  const time = document.getElementById("time").value;

  fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ day, subject, time }),
  })
    .then((response) => response.text())
    .then(() => {
      alert("추가 완료!");
      loadSchedule();
    })
    .catch((error) => console.error("Error:", error));
}

// 시간표 수정
function updateSchedule(id) {
  const newDay = prompt("새 요일 입력:");
  const newSubject = prompt("새 과목 입력:");
  const newTime = prompt("새 시간 입력:");

  fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ day: newDay, subject: newSubject, time: newTime }),
  })
    .then((response) => response.text())
    .then(() => {
      alert("수정 완료!");
      loadSchedule();
    })
    .catch((error) => console.error("Error:", error));
}

// 시간표 삭제
function deleteSchedule(id) {
  if (confirm("정말 삭제하시겠습니까?")) {
    fetch(`${API_URL}/delete/${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then(() => {
        alert("삭제 완료!");
        loadSchedule();
      })
      .catch((error) => console.error("Error:", error));
  }
}

// 페이지 로드 시 시간표 불러오기
window.onload = loadSchedule;

const ADMIN_PASSWORD = "1234"; // 변경 가능

window.onload = function () {
  const inputPassword = prompt("관리자 비밀번호를 입력하세요:");
  if (inputPassword !== ADMIN_PASSWORD) {
    alert("잘못된 비밀번호입니다.");
    window.location.href = "index.html"; // 일반 페이지로 이동
  } else {
    loadSchedule();
  }
};
