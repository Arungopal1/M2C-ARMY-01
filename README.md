# 💻 AI PC Builder Component Recommendation System

An AI-powered system that recommends the best compatible PC components based on user input such as budget and use case (e.g., gaming, editing, office). Built with modern technologies like *FastAPI, **FAISS, **Sentence Transformers, and **React.js*, the system enables fast, intelligent, and user-friendly custom PC configurations.

---

## 🚀 Features

- 🔍 Intelligent recommendations using semantic search
- ⚡ Fast vector-based retrieval with FAISS
- 📊 Budget-based filtering and performance ranking
- 🔐 Secure user authentication with Firebase
- 🧠 Embedding generation via Sentence Transformers
- 🌐 Responsive frontend using React.js
- 📁 CSV-based dataset for PC components
- 🔄 Modular, scalable architecture (Frontend + API)

---

## 🛠 Tech Stack

| Layer         | Technology                        |
|---------------|------------------------------------|
| Frontend      | React.js                          |
| Backend       | FastAPI (Python)                  |
| Authentication| Firebase Authentication           |
| Embedding     | Sentence Transformers (MiniLM)    |
| Vector Search | FAISS (Facebook AI Similarity)    |
| Storage       | CSV dataset (PC parts metadata)   |

---

## 🧠 How It Works

1. *User Input*: Enter use case (e.g., "video editing") and budget.
2. *Semantic Embedding*: Query is embedded using SentenceTransformer.
3. *Vector Search*: FAISS matches the query vector with pre-embedded components.
4. *Filtering*: Filters are applied for budget and compatibility.
5. *Recommendations*: Grouped and ranked components (CPU, GPU, RAM, etc.) are returned.

---

## 📦 Installation & Setup

### Backend (FastAPI)
bash
git clone https://github.com/yourusername/pc-builder-recommendation.git
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


### Frontend (React)
bash
cd frontend
npm install
npm start


### Firebase Setup
- Add your Firebase project config to /frontend/src/firebase.js
- Enable Authentication (Email/Password) in Firebase Console

---

## 🧪 Testing

- ✅ Unit Tests: Python unittest for backend modules
- ✅ Functional Tests: Postman & browser-based walkthroughs
- ✅ Performance: Sub-500ms response time (tested with Apache Bench)

---

## 📈 Future Enhancements

- 🔄 Real-time price tracking via e-commerce APIs
- 🛠 Full compatibility checker (socket, RAM speed, PSU wattage)
- 🌐 Multilingual support (e.g., Tamil, Hindi)
- 📱 Mobile app (React Native)
- 🖼 Visual PC build previews
- 🧑‍💻 Admin panel for dataset updates

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues, create pull requests, or suggest features.

---


## ⭐ Give this project a star if you find it useful!
