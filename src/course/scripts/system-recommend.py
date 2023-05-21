from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd


objects = pd.read_csv('D:/Code/DACN/be-studyapp/src/course/scripts/courses.csv')
objects = pd.DataFrame(objects)
objects['text'] = objects['title'] + ' ' + objects['description']

vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform(objects['text'])

def recommend_products(num_items):
    # Compute the cosine similarities between all products
    cosine_similarities = linear_kernel(vectors, vectors)

    # Iterate over each product and find the top similar products
    recommended_items = []
    for idx in range(len(objects)):
        similarity_scores = cosine_similarities[idx]
        sorted_indices = similarity_scores.argsort()[::-1]
        top_similar_indices = sorted_indices[1:num_items+1]
        top_similar_products = objects.loc[top_similar_indices]
        recommended_items.append(top_similar_products)

    return recommended_items

# Usage example
num_items = 10  # Number of items to recommend

recommended_products = recommend_products(num_items)
print(recommended_products)

# for product, similar_products in recommended_products:
#     print(f"Product: {product}")
#     print("Similar Products:")
#     for sim_product in similar_products:
#         print(sim_product)
#     print()