// Import the Firebase SDKs (2025 stable modular syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAS1k8LoWuUfD48yW7BaNjr_7HEvj7sVSc",
  authDomain: "reporterapp-1cf28.firebaseapp.com",
  projectId: "reporterapp-1cf28",
  storageBucket: "reporterapp-1cf28.appspot.com",
  messagingSenderId: "226849515931",
  appId: "1:226849515931:web:fc96606681592dc56c193e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submit
document.getElementById("interview-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const question = document.getElementById("question").value.trim();

  if (!name || !question) {
    alert("請完整填寫姓名與問題！");
    return;
  }

  try {
    await addDoc(collection(db, "interview_questions"), {
      name,
      question,
      timestamp: new Date()
    });
    alert("問題已成功送出！");
    document.getElementById("interview-form").reset();
  } catch (err) {
    console.error("Error adding document: ", err);
    alert("上傳失敗，請稍後再試。");
  }
});
