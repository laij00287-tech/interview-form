// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// 請替換為你 Firebase 專案的 config
const firebaseConfig = {
  apiKey: "AIzaSyAS1k8LoWuUfD48yW7BaNjr_7HEvj7sVSc",
  authDomain: "reporterapp-1cf28.firebaseapp.com",
  projectId: "reporterapp-1cf28",
  storageBucket: "reporterapp-1cf28.appspot.com",
  messagingSenderId: "226849515931",
  appId: "1:226849515931:android:fc96606681592dc56c193e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const questionList = document.getElementById("questionList");

const qaCol = collection(db, "qa");
const qaQuery = query(qaCol, orderBy("timestamp", "desc"));

onSnapshot(qaQuery, (snapshot) => {
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

// 將答案寫入 Firestore
window.submitAnswer = async (id) => {
  const answer = document.getElementById(`input-${id}`).value;
  const docRef = doc(db, "qa", id);
  await updateDoc(docRef, { answer: answer });
  alert("✅ 回答已送出");
};
