import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// 🔧 Firebase 專案設定（請替換成你的 config）
const firebaseConfig = {
  apiKey: "你的_API_KEY",
  authDomain: "你的專案ID.firebaseapp.com",
  projectId: "你的專案ID",
  storageBucket: "你的專案ID.appspot.com",
  messagingSenderId: "xxxxxxx",
  appId: "1:xxxxxx:web:xxxxxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const questionList = document.getElementById("questionList");

onSnapshot(collection(db, "qa"), (snapshot) => {
  questionList.innerHTML = "";
  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data();
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <div class="question">Q: ${data.question}</div>
      <input class="answer-input" placeholder="輸入回答..." id="input-${docSnap.id}" value="${data.answer || ""}" />
      <button onclick="submitAnswer('${docSnap.id}')">送出答案</button>
    `;
    questionList.appendChild(card);
  });
});

// --- 提交答案 (直接更新 Firestore) ---
window.submitAnswer = async (id) => {
  const answer = document.getElementById(`input-${id}`).value;
  const docRef = doc(db, "qa", id);
  await updateDoc(docRef, { answer: answer });
  alert("✅ 回答已送出");
};
