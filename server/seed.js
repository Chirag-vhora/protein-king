import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './src/models/Product.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura-performance';

const products = [
  {
    name: 'PLATINUM ISOLATE',
    sku: 'AURA-P-001',
    description: 'Engineered for elite biological optimization. Aura Platinum Isolate delivers 28g of pure cold-filtered isolate per serving. Zero fillers. Zero sugar. Maximum metabolic efficiency.',
    price: 74.00,
    quantity: 1240,
    category: 'WHEY',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfbCm7Gt3yW-CxwAk4bTh4gw-L-jUomeKAcrFXwiHXJsWM64XUKarcvpInshkazWps6cD2TmAES8-gAfI4lzVguh763fAYnCBGDgLuZ0C1yvstEg_hLaS6A1pS1OrraeO50i6Yq1Rp8WB8irMLQHacerO8jWcqcxeMIDmPbgQFAn8WdXNRsw94IiK5RKFMvBSrBPYMX5_X6eBLlWZZYrHYwLnaPv5rQlYEQgXILUrdndQDAV-akZb8vBx5cKPbxP4H10gYnKhIuw',
    tags: ['Pure Isolate', 'Premium Series', 'Elite Isolate'],
    servings: '32 Servings',
    nutrition: {
      protein: '28G',
      carbs: '1G',
      fat: '0.5G',
      calories: '120 KCAL',
      leucine: '3.2G',
      bcaa: '6.8G',
      glutamine: '5.1G'
    },
    flavors: ['Chocolate', 'Vanilla']
  },
  {
    name: 'NEURAL DRIVE',
    sku: 'AURA-N-224',
    description: 'Elite cognitive pre-workout. Infused with neural-enhancers to unlock laser-focused drive and peak muscular performance. No jitters. Pure focus.',
    price: 58.00,
    quantity: 42,
    category: 'PRE-WORKOUT',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXn-bkcieYS2IAbG-jaz-aZL6Y_ZGEEPUCh-JzGz9e76hbO1IZ5Bcd8dOS_bVZP3TYF03aY_K3i2IhdiGaVFmz2zEBMtZ_GQiO89Br90sokAGv6OrYWgHVs4DJ-1oIZNwMlLZ9ZMSI1O5hGJ3a-mjauzogdcf1gPk5Px2_3y0A2L4d0LtqoSaoA4m5IwkAzrR9VaDbtXwrkoPr2ppT9t0Idj2fBAmSgs2aDcBmbzkvzg_TErHR_h50IFt4yIBuPrwTvw2mbMXkEw',
    tags: ['Focus Max', 'Neural Drive', 'Nootropic'],
    servings: '40 Servings',
    nutrition: {
      protein: '0G',
      carbs: '2G',
      fat: '0G',
      calories: '10 KCAL',
      leucine: '0G',
      bcaa: '0G',
      glutamine: '0G'
    },
    flavors: ['Arctic Cherry', 'Sour Apple']
  },
  {
    name: 'OMEGA RECOVERY',
    sku: 'AURA-R-310',
    description: 'Surgical-grade post-workout recovery repair. Complete profile of essential amino acids and anti-inflammatory recovery catalysts for rapid muscle rebuilding.',
    price: 65.00,
    quantity: 220,
    category: 'WHEY',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNLLK_KEc6rIdX8G8gJ7_9V5DSz8gLGcxIzikWWscwVppfqaB-FnL83beqnhRIFnzbXKKRQf2_s7LazU-hnayxjLWQurBE7Ht25Mv5Wny5Dk0S9iCfP6YmR5VClYho_Sn42G-NyZtyT5fTeYzvR_aSOwCDV-FxFY2a0nbyuD7bDVraFA9CQ6xx4u-H_0Yw5xB2IHLSaiKFH35B4iSpLj5r6gsPCqeHJJBD_hjCnKI6cHfJEuozo7wUuyewfyPya_cNyxIhFTK6xg',
    tags: ['Anabolic State', 'Post-Workout', 'Recovery'],
    servings: '30 Servings',
    nutrition: {
      protein: '24G',
      carbs: '3G',
      fat: '1G',
      calories: '110 KCAL',
      leucine: '2.5G',
      bcaa: '5.5G',
      glutamine: '4.5G'
    },
    flavors: ['Unflavored', 'Blackberry']
  },
  {
    name: 'CREA-PURE PERFORMANCE',
    sku: 'AURA-C-109',
    description: 'Micronized German Creatine Monohydrate for explosive strength, cell volumization, and enhanced athletic endurance. 100% pure pharmaceutical grade.',
    price: 45.00,
    quantity: 458,
    category: 'VEGAN',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuN1AdSz7qBkrGZIVuwgb1SpT85zaElDYlr3B29pnta4v_z3Ea0ZnvomgA0Wz0VpILFExJ-UNEXC5u9xtZzbB8C2nNytoi3OAG8jnFxrYMuQh9yeHeOW_33_8RkzAfEzTtQUkH3O829McezTk7j6Nqud5F7jUQzOHZcQUZUCwTAjMXWtuav0W5F2rdpJOhP9xSkVJ05-hxEj03Zjc7Ex7C8LzE2oTDxB9Gcldpx_8JQE_OND51_4d6d96hD62VKpryNAPTcbw4zQ',
    tags: ['Pure Strength', 'Micronized', 'Creatine'],
    servings: '80 Servings',
    nutrition: {
      protein: '0G',
      carbs: '0G',
      fat: '0G',
      calories: '0 KCAL',
      leucine: '0G',
      bcaa: '0G',
      glutamine: '0G'
    },
    flavors: ['Unflavored']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Inserted seed products');
    
    await mongoose.disconnect();
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
