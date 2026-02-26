// دالة لتحديد الحرف الفعلي للإجابة بعد تجاهل "ال"
function getEffectiveLetter(text) {
  let clean = text.trim();

  // حذف "ال" إذا موجودة
  if (clean.startsWith("ال")) {
    clean = clean.slice(2);
  }

  // أخذ أول حرف
  let firstLetter = clean.charAt(0);

  // توحيد الألف
  if (["أ", "إ", "آ"].includes(firstLetter)) {
    firstLetter = "ا";
  }

  return firstLetter;
}
let questions = [];
let filteredQuestions = [];
let current = 0;

// تحميل بنك الأسئلة عند بداية الصفحة
window.onload = () => {
  fetch('questions.json')
    .then(res => res.json())
    .then(data => {
      questions = data;
      filteredQuestions = [];
      document.getElementById("question").innerText = "";
      document.getElementById("answer").innerText = "";
    })
    .catch(err => {
      document.getElementById("question").innerText = "حدث خطأ في تحميل الأسئلة!";
      console.error(err);
    });
};

// عرض السؤال الحالي
function showQuestion() {
  if(filteredQuestions.length === 0) return;
  document.getElementById("question").innerText = filteredQuestions[current].q;
  document.getElementById("answer").innerText = filteredQuestions[current].a;
  document.getElementById("answer").style.display = "none";
}

// إظهار الإجابة
function showAnswer() {
  document.getElementById("answer").style.display = "block";
}

// تغيير السؤال ضمن نفس الفئة (عشوائي)
function changeQuestion() {
  if(filteredQuestions.length === 0) return;
  current = Math.floor(Math.random() * filteredQuestions.length);
  showQuestion();
}

// فلترة الأسئلة حسب الحرف المختار
function filterQuestions() {
  const letter = document.getElementById("letter").value;

  const welcome = document.getElementById("welcome-message");
  const questionContainer = document.getElementById("question-container");

  if(letter === ""){
    filteredQuestions = [];
    current = 0;
    document.getElementById("question").innerText = "";
    document.getElementById("answer").innerText = "";
    questionContainer.style.display = "none"; // نخفي الصندوق إذا لم يختار حرف
  } else {
    // إخفاء الرسالة الترحيبية وإظهار الصندوق
    if(welcome) welcome.style.display = "none";
    questionContainer.style.display = "block";

    filteredQuestions = questions.filter(q => getEffectiveLetter(q.a) === letter);

    if(filteredQuestions.length === 0){
      current = 0;
      document.getElementById("question").innerText = "";
      document.getElementById("answer").innerText = "";
    } else {
      current = Math.floor(Math.random() * filteredQuestions.length);
      showQuestion();
    }
  }
}