import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";
import img5 from "@/assets/Image-5.jpg";
import img6 from "@/assets/Image-6.jpg";
import img7 from "@/assets/Image-7.jpg";
import img8 from "@/assets/Image-8.jpg";

const productImages = [img1, img2, img3, img4, img5, img6, img7, img8];

export const products = [
  // MEN (JUMBLED)
  { id: 1, name: "Oversized Graphic T-Shirt", category: "men", price: 59, rating: 4.7, tag: "Trending", image: productImages[3] },
  { id: 2, name: "Premium Baggy Denim", category: "men", price: 120, rating: 4.6, tag: "Trending", image: productImages[7] },
  { id: 3, name: "Minimal Street Hoodie", category: "men", price: 95, rating: 4.8, tag: "New", image: productImages[1] },
  { id: 4, name: "Relaxed Cargo Pants", category: "men", price: 110, rating: 4.5, tag: "Trending", image: productImages[5] },
  { id: 5, name: "Street Bomber Jacket", category: "men", price: 180, rating: 4.9, tag: "Limited", image: productImages[0] },
  { id: 6, name: "Classic White Sneakers", category: "men", price: 140, rating: 4.7, tag: "Hot", image: productImages[6] },
  { id: 7, name: "Black Minimal Hoodie", category: "men", price: 90, rating: 4.6, tag: "New", image: productImages[2] },
  { id: 8, name: "Loose Summer Shirt", category: "men", price: 65, rating: 4.4, tag: "New", image: productImages[4] },

  
  // WOMEN (JUMBLED)
  { id: 21, name: "Oversized Cotton Tee", category: "women", price: 49, rating: 4.7, tag: "Trending", image: productImages[6] },
  { id: 22, name: "High Waist Denim", category: "women", price: 98, rating: 4.4, tag: "New", image: productImages[2] },
  { id: 23, name: "Crop Hoodie", category: "women", price: 85, rating: 4.8, tag: "New", image: productImages[5] },
  { id: 24, name: "Cargo Skirt", category: "women", price: 95, rating: 4.5, tag: "Trending", image: productImages[1] },
  { id: 25, name: "Wool Blend Coat", category: "women", price: 210, rating: 4.9, tag: "Limited", image: productImages[7] },
  { id: 26, name: "Wide Leg Jeans", category: "women", price: 105, rating: 4.5, tag: "Trending", image: productImages[3] },
  { id: 27, name: "Oversized Blazer", category: "women", price: 150, rating: 4.6, tag: "New", image: productImages[0] },
  { id: 28, name: "Floral Dress", category: "women", price: 75, rating: 4.4, tag: "New", image: productImages[4] },

  // OVERSIZED
  { id: 41, name: "Oversized Graphic Tee", category: "oversized", price: 55, rating: 4.7, tag: "Trending", image: productImages[4] },
  { id: 42, name: "Oversized Hoodie", category: "oversized", price: 95, rating: 4.8, tag: "New", image: productImages[1] },
  { id: 43, name: "Minimal Shirt", category: "oversized", price: 70, rating: 4.5, tag: "Trending", image: productImages[6] },
  { id: 44, name: "Baggy Sweatshirt", category: "oversized", price: 90, rating: 4.6, tag: "New", image: productImages[0] },
  { id: 45, name: "Oversized Jacket", category: "oversized", price: 140, rating: 4.7, tag: "Trending", image: productImages[3] },
  { id: 46, name: "Loose Shirt", category: "oversized", price: 65, rating: 4.4, tag: "New", image: productImages[7] },
  { id: 47, name: "Minimal Tee", category: "oversized", price: 50, rating: 4.3, tag: "Trending", image: productImages[2] },
  { id: 48, name: "Street Sweatshirt", category: "oversized", price: 85, rating: 4.6, tag: "New", image: productImages[5] },

 
  // SNEAKERS
  { id: 301, name: "Phantom Street Sneakers", category: "sneakers", price: 120, rating: 4.7, tag: "Trending", image: productImages[5] },
  { id: 302, name: "Shadow Runner", category: "sneakers", price: 110, rating: 4.6, tag: "Hot", image: productImages[0] },
  { id: 303, name: "Neo Urban High Tops", category: "sneakers", price: 135, rating: 4.8, tag: "Trending", image: productImages[7] },
  { id: 304, name: "Chunky Sneakers", category: "sneakers", price: 140, rating: 4.7, tag: "New", image: productImages[2] },
  { id: 305, name: "Night Runner", category: "sneakers", price: 115, rating: 4.5, tag: "Trending", image: productImages[4] },
  { id: 306, name: "Streetwave Sneakers", category: "sneakers", price: 125, rating: 4.6, tag: "New", image: productImages[6] },
  { id: 307, name: "Mono Flex Sneakers", category: "sneakers", price: 118, rating: 4.5, tag: "Hot", image: productImages[1] },
  { id: 308, name: "Urban Drift Sneakers", category: "sneakers", price: 132, rating: 4.7, tag: "Trending", image: productImages[3] },

  // ACCESSORIES
  { id: 401, name: "Minimal Silver Chain", category: "accessories", price: 35, rating: 4.4, tag: "Trending", image: productImages[1] },
  { id: 402, name: "Leather Bracelet", category: "accessories", price: 28, rating: 4.3, tag: "New", image: productImages[6] },
  { id: 403, name: "Black Sunglasses", category: "accessories", price: 55, rating: 4.6, tag: "Trending", image: productImages[3] },
  { id: 404, name: "Classic Watch", category: "accessories", price: 120, rating: 4.7, tag: "Premium", image: productImages[0] },
  { id: 405, name: "Aesthetic Beanie", category: "accessories", price: 30, rating: 4.5, tag: "New", image: productImages[7] },
  { id: 406, name: "Ring Set", category: "accessories", price: 26, rating: 4.2, tag: "Trending", image: productImages[4] },
  { id: 407, name: "Street Cap", category: "accessories", price: 32, rating: 4.4, tag: "New", image: productImages[2] },
  { id: 408, name: "AirPods Case", category: "accessories", price: 22, rating: 4.3, tag: "Trending", image: productImages[5] },

 
  // BAGS
  { id: 101, name: "Urban Shadow Backpack", category: "bags", price: 89, rating: 4.6, image: productImages[5] },
  { id: 102, name: "Midnight Crossbody", category: "bags", price: 59, rating: 4.4, image: productImages[1] },
  { id: 103, name: "Techwear Sling Bag", category: "bags", price: 72, rating: 4.5, image: productImages[7] },
  { id: 104, name: "Street Cargo Backpack", category: "bags", price: 95, rating: 4.7, image: productImages[3] },
  { id: 105, name: "Aesthetic Mini Backpack", category: "bags", price: 65, rating: 4.3, image: productImages[0] },
  { id: 106, name: "Dark Mode Tote Bag", category: "bags", price: 48, rating: 4.2, image: productImages[6] },
  { id: 107, name: "Urban Utility Backpack", category: "bags", price: 92, rating: 4.6, image: productImages[2] },
  { id: 108, name: "Minimal Black Sling", category: "bags", price: 54, rating: 4.4, image: productImages[4] },
];