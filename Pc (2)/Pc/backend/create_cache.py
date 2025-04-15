import pickle
import numpy as np
import os

# Create empty cache with proper structure
texts = []
metadata = []
datasets = []
embeddings = np.zeros((0, 384))  # Empty array with 384 dimensions (common for embeddings)

cache_path = r'F:\M2C\Pc (2)\Pc\backend\embeddings_cache.pkl'
with open(cache_path, 'wb') as f:
    pickle.dump((texts, metadata, datasets, embeddings), f)

print(f"Created embeddings cache at {cache_path}")
