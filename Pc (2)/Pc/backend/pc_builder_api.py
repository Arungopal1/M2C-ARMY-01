import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import openai
import pickle
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600
)

# Load SentenceTransformer model
try:
    embedder = SentenceTransformer("all-MiniLM-L6-v2")
    logger.info("SentenceTransformer model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading SentenceTransformer model: {e}")
    raise

# Sambanova API Key
SAMBA_API_KEY = "02a3309f-ab10-4283-9f8b-a1f0e17bd231"

# Initialize OpenAI client
try:
    client = openai.OpenAI(
        api_key=SAMBA_API_KEY,
        base_url="https://api.sambanova.ai/v1",
    )
    logger.info("OpenAI client initialized successfully.")
except Exception as e:
    logger.error(f"Error initializing OpenAI client: {e}")
    raise

# Load embeddings & metadata
CACHE_FILE = r"F:\M2C\Pc (2)\Pc\backend\embeddings_cache.pkl"
try:
    if not os.path.exists(CACHE_FILE):
        raise FileNotFoundError("Embeddings cache file not found! Ensure 'embeddings_cache.pkl' exists.")

    with open(CACHE_FILE, "rb") as f:
        texts, metadata, datasets, embeddings = pickle.load(f)
    logger.info("Embeddings and metadata loaded successfully.")
except Exception as e:
    logger.error(f"Error loading embeddings cache: {e}")
    raise

# Build FAISS index
try:
    d = embeddings.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(embeddings)
    logger.info("FAISS index built successfully.")
except Exception as e:
    logger.error(f"Error building FAISS index: {e}")
    raise

# Request Model
class PCBuildRequest(BaseModel):
    budget: int
    use_case: str
    preferences: str

# Retrieve similar components
def retrieve_context(query, top_k=5):
    try:
        query_embedding = embedder.encode([query], convert_to_numpy=True).astype('float32')
        # Get the total number of items in the index
        total_items = index.ntotal
        
        # Adjust top_k if it's larger than the total number of items
        if top_k > total_items:
            top_k = total_items
            logger.info(f"Adjusted top_k to {top_k} based on available items")
        
        # Ensure we have at least one item to retrieve
        if top_k == 0:
            logger.warning("No items in the index to retrieve")
            return "No relevant components found."
            
        distances, indices = index.search(query_embedding, top_k)
        
        # Check if we got any results
        if len(indices) == 0 or len(indices[0]) == 0:
            logger.warning("No search results returned from FAISS index")
            return "No relevant components found."
            
        # Safely retrieve texts
        retrieved_texts = []
        for idx in indices[0]:
            if 0 <= idx < len(texts):
                retrieved_texts.append(texts[idx])
            else:
                logger.warning(f"Index {idx} out of range for texts array of length {len(texts)}")
                
        if not retrieved_texts:
            return "No relevant components found."
            
        return "\n".join(retrieved_texts)
    except Exception as e:
        logger.error(f"Error retrieving context: {e}")
        raise HTTPException(status_code=500, detail=f"Error retrieving context: {e}")

# AI-based PC build recommendation
def generate_recommendation(query, top_k=5):
    try:
        context = retrieve_context(query, top_k)
        prompt = f"""You are a PC build expert. Recommend an optimized PC build based on these components:
        
Context:
{context}

User Query:
{query}

Provide the recommendation in the following format:
**Component Name:** Details (Price)

After the recommendation, provide a brief description of each component and why it was chosen.

Example:
**Case:** Asus TUF Gaming GT502 (R11,582.50)
**CPU:** AMD Ryzen 5 5600X - 6 cores, 12 threads, 3.6 GHz base clock, 4.2 GHz boost clock (R24,990)
**Motherboard:** MSI B550M BAZOOKA - Micro-ATX, USB 3.2 Gen 2, SATA 6Gb/s, HDMI, DisplayPort (R12,490)
**GPU:** NVIDIA GeForce RTX 3060 - 6 GB GDDR6, 1280 CUDA cores, 1320 MHz boost clock (R43,990)
**RAM:** Corsair Vengeance LPX 16 GB (2x8 GB) - DDR4, 3200 MHz, C16 (R6,490)
**Storage:** Western Digital Black SN750 1 TB - NVMe SSD, 3500 MB/s read, 3000 MB/s write (R13,490)
**Power Supply:** EVGA 650 GS, 80+ Gold 650 Watt - 90% efficiency, 5-year warranty (R9,490)
**Total Cost:** ₹98,942.30

**Component Descriptions:**
1. **Case:** The Asus TUF Gaming GT502 is chosen for its excellent airflow and build quality, making it ideal for high-performance builds.
2. **CPU:** The AMD Ryzen 5 5600X offers excellent multi-core performance, making it perfect for gaming and productivity tasks.
3. **Motherboard:** The MSI B550M BAZOOKA provides great connectivity options and supports the latest AMD processors.
4. **GPU:** The NVIDIA GeForce RTX 3060 delivers excellent performance for 1080p and 1440p gaming.
5. **RAM:** Corsair Vengeance LPX 16 GB ensures smooth multitasking and gaming performance.
6. **Storage:** The Western Digital Black SN750 1 TB NVMe SSD offers fast read/write speeds, reducing load times.
7. **Power Supply:** The EVGA 650 GS provides reliable power delivery and efficiency, ensuring system stability.
"""
        messages = [
            {"role": "system", "content": "You are a helpful AI for PC build recommendations."},
            {"role": "user", "content": prompt}
        ]

        logger.info(f"Sending request to Sambanova API with payload: {messages}")

        response = client.chat.completions.create(
            model="Meta-Llama-3.3-70B-Instruct",
            messages=messages,
            temperature=0.1,
            top_p=0.1
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Error generating recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Sambanova API Error: {str(e)}")
    
    
# API Endpoint to get PC build recommendation
@app.post("/recommend")
def recommend_pc(request: PCBuildRequest):
    try:
        query = f"Budget: {request.budget} rupees. Use case: {request.use_case}. Preferences: {request.preferences}"
        recommendation = generate_recommendation(query, top_k=5)
        return {"recommendation": recommendation}
    except Exception as e:
        logger.error(f"Error in /recommend endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Run the server (if directly executed)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("pc_builder_api:app", host="127.0.0.1", port=8000, reload=True)